"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Bell, Zap, X, Shield, Smartphone } from "lucide-react";

// Extend Window interface to include MSStream
declare global {
  interface Window {
    MSStream?: any;
    BeforeInstallPromptEvent?: any;
  }
}

export default function InstallPrompt({
  onboardingVisible = false,
}: {
  onboardingVisible?: boolean;
}) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isDismissedPermanently, setIsDismissedPermanently] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Check if already installed and detect iOS
  useEffect(() => {
    const isStandaloneMode = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsStandalone(isStandaloneMode);

    // Detect iOS - more accurate detection with proper type checking
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream &&
      !(window as any).chrome;
    setIsIOS(isIOSDevice);

    const dismissed = localStorage.getItem("pwa-install-dismissed") === "true";
    setIsDismissedPermanently(dismissed);
  }, []);

  // Capture beforeinstallprompt event
  useEffect(() => {
    if (onboardingVisible || isStandalone) return;

    const handler = (e: any) => {
      console.log("beforeinstallprompt triggered");
      e.preventDefault();
      setDeferredPrompt(e);

      if (isDismissedPermanently) {
        setShowButton(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check for existing prompt capability
    if (window.BeforeInstallPromptEvent) {
      console.log("Browser supports beforeinstallprompt");
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [onboardingVisible, isDismissedPermanently, isStandalone]);

  // Show modal after conditions are met
  useEffect(() => {
    if (!onboardingVisible && !isStandalone && !isDismissedPermanently) {
      if (deferredPrompt || isIOS) {
        const delay = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(delay);
      }
    }
  }, [
    onboardingVisible,
    deferredPrompt,
    isDismissedPermanently,
    isStandalone,
    isIOS,
  ]);

  // Don't render if already installed
  if (isStandalone) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("User choice:", outcome);
      setDeferredPrompt(null);
      setIsVisible(false);

      if (outcome === "accepted") {
        localStorage.setItem("pwa-install-dismissed", "true");
      }
    } else if (isIOS) {
      // For iOS, just close the dialog as it's informational
      setIsVisible(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleDismissPermanently = () => {
    localStorage.setItem("pwa-install-dismissed", "true");
    setIsDismissedPermanently(true);
    setIsVisible(false);
    setShowButton(true);
  };

  const handleShowDialog = () => {
    setIsVisible(true);
  };

  return (
    <>
      <Dialog open={isVisible} onOpenChange={setIsVisible}>
        {(showButton || deferredPrompt || isIOS) && !isVisible && (
          <DialogTrigger asChild>
            <Button
              onClick={handleShowDialog}
              title="Install Admin TAUD Salsabila"
              className="fixed top-20 right-4 z-50 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="w-5 h-5" />
            </Button>
          </DialogTrigger>
        )}

        <DialogContent className="max-w-sm rounded-2xl border-0 shadow-2xl bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-0 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-6 text-white">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 h-7 w-7"
            >
              <X className="w-3.5 h-3.5" />
            </Button>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                {isIOS ? (
                  <Smartphone className="w-6 h-6 text-white" />
                ) : (
                  <Download className="w-6 h-6 text-white" />
                )}
              </div>
              <DialogTitle className="text-xl font-bold mb-1">
                {isIOS ? "Tambah ke Home Screen" : "Install Admin TAUD"}
              </DialogTitle>
              <p className="text-yellow-100 text-xs">
                {isIOS
                  ? "Akses aplikasi seperti app native"
                  : "Akses cepat dari home screen Anda"}
              </p>
            </div>

            {/* Background decorative */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {isIOS ? (
              // iOS Instructions
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Cara install di iOS:
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>
                      Tap tombol <strong>Share</strong> (⎋) di Safari
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>
                      Pilih <strong>"Add to Home Screen"</strong> (➕)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>
                      Tap <strong>"Add"</strong> untuk konfirmasi
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              // Android/Chrome features
              <>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <Feature
                    icon={Zap}
                    label="Cepat"
                    color="from-green-400 to-green-500"
                  />
                  <Feature
                    icon={Bell}
                    label="Notifikasi"
                    color="from-blue-400 to-blue-500"
                  />
                  <Feature
                    icon={Shield}
                    label="Offline"
                    color="from-purple-400 to-purple-500"
                  />
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/20">
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <Dot color="green" />
                      Akses langsung dari home screen
                    </li>
                    <li className="flex items-center gap-2">
                      <Dot color="blue" />
                      Notifikasi untuk update data
                    </li>
                    <li className="flex items-center gap-2">
                      <Dot color="purple" />
                      Tetap bisa digunakan offline
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="px-6 pb-4 pt-0">
            <div className="w-full space-y-2">
              <Button
                onClick={handleInstallClick}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-xl py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isIOS ? (
                  <>
                    <Smartphone className="w-4 h-4 mr-2" />
                    Mengerti
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Install Sekarang
                  </>
                )}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="flex-1 text-gray-500 hover:text-gray-700 text-xs py-1"
                >
                  Nanti saja
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleDismissPermanently}
                  className="flex-1 text-gray-400 hover:text-gray-600 text-xs py-1"
                >
                  Jangan ingatkan lagi
                </Button>
              </div>
            </div>
          </DialogFooter>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400" />
        </DialogContent>
      </Dialog>
    </>
  );
}

function Feature({
  icon: Icon,
  label,
  color,
}: {
  icon: any;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center space-y-1">
      <div
        className={`w-10 h-10 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mx-auto`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-xs font-medium text-gray-700">{label}</p>
    </div>
  );
}

function Dot({ color }: { color: "green" | "blue" | "purple" }) {
  const colors: Record<string, string> = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };
  return <div className={`w-1 h-1 rounded-full ${colors[color]}`} />;
}
