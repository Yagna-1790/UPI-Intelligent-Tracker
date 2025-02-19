import React, { useEffect, useState } from 'react';
import { QrCode, Camera, X } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useTransactions } from '../context/TransactionContext';

function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { addTransaction } = useTransactions();

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
          try {
            const url = new URL(decodedText);
            const params = new URLSearchParams(url.search);
            const transaction = {
              id: params.get('tid') || `txn_${Date.now()}`,
              merchant: params.get('pn') || 'Unknown Merchant',
              amount: Number(params.get('am')) || 0,
              category: 'Shopping', // Default category, can be improved with AI classification
              date: new Date().toISOString(),
              status: 'completed'
            };
            addTransaction(transaction);
          } catch (error) {
            console.error('Invalid QR code format:', error);
          }
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
  }, [scanning, addTransaction]);

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
    </div>
  );
}

export default QRScanner;
