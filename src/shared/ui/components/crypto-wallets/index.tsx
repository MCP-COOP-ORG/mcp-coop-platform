"use client";

import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Wallet, Copy, Check } from "lucide-react";
import { Modal, Snippet, useModal, Avatar } from "@/shared/ui/primitives";
import { Button } from "@/shared/ui/primitives";
import { NetworkKey, NETWORK_AVATARS } from "@/shared/constants/crypto";

function formatHash(hash: string): string {
  if (!hash || hash.length < 10) return hash;
  return `${hash.slice(0, 5)}...${hash.slice(-4)}`;
}

export interface CryptoWalletData {
  address: string;
  isPrimary?: boolean;
}

export interface CryptoWalletsProps {
  wallets?: {
    solana?: CryptoWalletData;
    bitcoin?: CryptoWalletData;
    ethereum?: CryptoWalletData;
    ton?: CryptoWalletData;
  };
  onChainId?: string | null;
  texts?: {
    selectNetwork: string;
    noAddress: string;
  };
  className?: string;
}

export const CryptoWallets: React.FC<CryptoWalletsProps> = ({
  wallets,
  onChainId,
  texts = { selectNetwork: "Select Network", noAddress: "No address" },
  className = ""
}) => {
  const { isOpen, onOpen, onOpenChange } = useModal();
  const [copied, setCopied] = useState(false);

  const availableNetworks = wallets ? (Object.keys(wallets) as NetworkKey[]) : [];
  const defaultNetwork = availableNetworks.find(k => wallets![k]?.isPrimary) || availableNetworks[0];

  const [activeNetwork, setActiveNetwork] = useState<NetworkKey | undefined>(defaultNetwork);

  const triggerAddress = onChainId && onChainId.trim() !== "" 
    ? onChainId 
    : (defaultNetwork && wallets ? wallets[defaultNetwork]?.address : null);

  if (!triggerAddress) {
    return null; 
  }

  const currentAddress = (activeNetwork && wallets && wallets[activeNetwork]?.address) || triggerAddress;
  const hasWallets = availableNetworks.length > 0;

  const handleCopy = () => {
    if (triggerAddress) {
      navigator.clipboard.writeText(triggerAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Button
        appVariant="success-action"
        size="sm"
        disableAnimation
        disableRipple
        className={`px-2 flex shrink-0 gap-1 font-mono tracking-wider items-center font-medium h-7 min-h-7 relative z-10 
          ${!hasWallets ? "cursor-default hover:bg-success/20" : ""} ${className}`}
        onPress={hasWallets ? onOpen : undefined}
      >
        <Wallet className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
        <span className="mx-0.5">{formatHash(triggerAddress)}</span>

        <div
          role="button"
          tabIndex={0}
          title="Скопировать адрес"
          className="p-1 rounded-sm hover:bg-success/20 transition-colors cursor-pointer"
          onPointerDown={(e) => {
            // Prevent React Aria's usePress from firing on the parent Button
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCopy();
          }}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" strokeWidth={2} />
          ) : (
            <Copy className="w-3.5 h-3.5 opacity-80" strokeWidth={2} />
          )}
        </div>
      </Button>

      {hasWallets && (
        <div className="relative z-[100]">
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="sm" placement="center">
            <div className="flex flex-col gap-1 items-center pb-2 pt-6">
              <span className="text-sm font-semibold mb-2">{texts.selectNetwork}</span>
              <div className="flex gap-4">
                {availableNetworks.map((net) => {
                  const isActive = activeNetwork === net;
                  const iconUrl = NETWORK_AVATARS[net];
                  if (!iconUrl) return null;

                  return (
                    <button
                      key={net}
                      onClick={() => setActiveNetwork(net)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all hover:opacity-80
                        ${isActive ? "border-success bg-success/10 shadow-sm" : "border-transparent bg-default-50"}
                      `}
                    >
                      <Avatar
                        src={iconUrl}
                        name={net.substring(0, 2).toUpperCase()}
                        classNames={{
                          base: "w-full h-full bg-transparent",
                          img: "object-contain scale-[0.65]",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center pb-8 pt-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-default-100 flex items-center justify-center" style={{ width: 200, height: 200 }}>
                {currentAddress ? (
                  <QRCode value={currentAddress} size={168} />
                ) : (
                  <span className="text-default-400 text-sm">{texts.noAddress}</span>
                )}
              </div>

              <div className="w-full mt-6">
                <Snippet
                  hideSymbol
                  color="default"
                  variant="flat"
                  className="w-full bg-default-100"
                  classNames={{
                    pre: "font-mono text-xs whitespace-normal break-all w-full text-center"
                  }}
                >
                  {currentAddress}
                </Snippet>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};
