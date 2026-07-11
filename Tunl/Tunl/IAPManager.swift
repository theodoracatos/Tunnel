import StoreKit

// Non-consumable "Remove Ads" purchase via StoreKit 2. Entitlement state is
// the source of truth (re-derived from Transaction.currentEntitlements), not
// just cached locally, so a fresh install on the same Apple ID stays unlocked.
final class IAPManager {

    static let removeAdsProductID = "remove_ads"

    private(set) var removeAdsOwned = false
    var onUpdate: ((Bool) -> Void)?

    private var updatesTask: Task<Void, Never>?

    init() {
        updatesTask = Task { [weak self] in
            for await result in Transaction.updates {
                await self?.handle(result)
            }
        }
    }

    deinit {
        updatesTask?.cancel()
    }

    func refreshEntitlements() async {
        for await result in Transaction.currentEntitlements {
            await handle(result)
        }
        onUpdate?(removeAdsOwned)
    }

    func purchaseRemoveAds() async {
        do {
            let products = try await Product.products(for: [Self.removeAdsProductID])
            guard let product = products.first else {
                print("IAP purchase: no product found for id \(Self.removeAdsProductID) - check StoreKit Configuration is set on the scheme")
                return
            }
            let result = try await product.purchase()
            switch result {
            case .success(let verification):
                await handle(verification)
            case .userCancelled:
                print("IAP purchase: user cancelled")
            case .pending:
                print("IAP purchase: pending (e.g. Ask to Buy)")
            @unknown default:
                print("IAP purchase: unknown result")
            }
        } catch {
            print("IAP purchase failed: \(error.localizedDescription)")
        }
    }

    func restore() async {
        try? await AppStore.sync()
        await refreshEntitlements()
    }

    private func handle(_ result: VerificationResult<Transaction>) async {
        guard case .verified(let transaction) = result else { return }
        if transaction.productID == Self.removeAdsProductID {
            removeAdsOwned = true
            await transaction.finish()
            onUpdate?(removeAdsOwned)
        }
    }
}
