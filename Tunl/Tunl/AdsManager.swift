import UIKit
import GoogleMobileAds

// Interstitial shown every 3rd death, never when Remove Ads is owned. Cadence
// state lives in UserDefaults (not JS) since ad frequency is a platform/store
// concern kept out of the shared game layer.
final class AdsManager: NSObject, FullScreenContentDelegate {

    static let interstitialAdUnitID = "ca-app-pub-3940256099942544/4411468910"
    private static let deathCountKey = "tunnel_death_count"
    private static let deathsPerAd = 3

    private var interstitial: InterstitialAd?

    override init() {
        super.init()
        MobileAds.shared.start(completionHandler: nil)
        Task { await loadInterstitial() }
    }

    func requestInterstitial(removeAdsOwned: Bool) {
        let defaults = UserDefaults.standard
        let count = defaults.integer(forKey: Self.deathCountKey) + 1
        defaults.set(count, forKey: Self.deathCountKey)

        guard !removeAdsOwned, count % Self.deathsPerAd == 0 else { return }

        guard let interstitial, let root = rootViewController() else {
            Task { await loadInterstitial() }
            return
        }
        interstitial.present(from: root)
    }

    private func loadInterstitial() async {
        do {
            interstitial = try await InterstitialAd.load(with: Self.interstitialAdUnitID, request: Request())
            interstitial?.fullScreenContentDelegate = self
        } catch {
            print("AdsManager: failed to load interstitial: \(error.localizedDescription)")
        }
    }

    private func rootViewController() -> UIViewController? {
        UIApplication.shared.connectedScenes
            .compactMap { ($0 as? UIWindowScene)?.keyWindow }
            .first?.rootViewController
    }

    func adDidDismissFullScreenContent(_ ad: FullScreenPresentingAd) {
        interstitial = nil
        Task { await loadInterstitial() }
    }

    func ad(_ ad: FullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        print("AdsManager: failed to present interstitial: \(error.localizedDescription)")
        interstitial = nil
        Task { await loadInterstitial() }
    }
}
