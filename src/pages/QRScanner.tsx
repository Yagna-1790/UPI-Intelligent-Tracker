import React, { useEffect, useState } from 'react';
import { QrCode, Camera, X } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          console.log(`Code scanned = ${decodedText}`);
          setScanResult(decodedText);
          scanner.clear();
          setScanning(false);
        },
        (error) => {
          console.warn(`Code scan error = ${error}`);
        }
      );

      return () => {
        scanner.clear();
      };
    }
  }, [scanning]);

  const handleStartScanning = () => {
    setScanResult(null);
    setScanning(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      <h1 className="text-2xl font-bold text-gray-900">Scan QR Code</h1>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="text-center space-y-4">
          {!scanning && !scanResult ? (
            <>
              <div className="flex justify-center">
                <QrCode className="h-24 w-24 text-gray-400" />
              </div>
              <p className="text-gray-600">
                Position the QR code within the frame to scan
              </p>
              <button
                onClick={handleStartScanning}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Camera className="h-5 w-5 mr-2" />
                Start Scanning
              </button>
            </>
          ) : scanning ? (
            <div className="relative">
              <div id="reader" className="w-full max-w-md mx-auto"></div>
              <button
                onClick={() => setScanning(false)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </button>
            </div>
          ) : scanResult ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">QR Code Scanned Successfully!</p>
                <p className="text-sm text-green-600 mt-1">{scanResult}</p>
              </div>
              <button
                onClick={handleStartScanning}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Camera className="h-5 w-5 mr-2" />
                Scan Another
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Scans</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Coffee Shop</p>
              <p className="text-sm text-gray-600">₹120 • 5 minutes ago</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Completed
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Grocery Store</p>
              <p className="text-sm text-gray-600">₹450 • 2 hours ago</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRScanner;