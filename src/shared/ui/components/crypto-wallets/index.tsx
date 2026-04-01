"use client";

import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Wallet } from "lucide-react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, Snippet, useDisclosure, Avatar } from "@/shared/ui/components/hero-ui";

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
  className?: string;
}

type NetworkKey = "solana" | "bitcoin" | "ethereum" | "ton";

const NETWORK_AVATARS: Record<NetworkKey, string> = {
  solana: "https://cryptologos.cc/logos/solana-sol-logo.svg",
  bitcoin: "https://cdn.simpleicons.org/bitcoin/F7931A",
  ethereum: "https://cdn.simpleicons.org/ethereum/3C3C3D",
  ton: "https://cdn.simpleicons.org/ton/0098EA",
};

function formatHash(hash: string): string {
  if (!hash || hash.length < 10) return hash;
  return `${hash.slice(0, 5)}...${hash.slice(-4)}`;
}

export const CryptoWallets: React.FC<CryptoWalletsProps> = ({ wallets, className = "" }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  if (!wallets || Object.keys(wallets).length === 0) {
    return null; // Ничего не рендерим, если кошельков нет
  }

  // Находим primary-сеть, либо берем первую попавшуюся
  const availableNetworks = Object.keys(wallets) as NetworkKey[];
  const defaultNetwork = availableNetworks.find(k => wallets[k]?.isPrimary) || availableNetworks[0];

  // Стейт активной сети в модалке (сбрасывается на дефолт при монтировании)
  const [activeNetwork, setActiveNetwork] = useState<NetworkKey>(defaultNetwork);

  const primaryAddress = wallets[defaultNetwork]?.address || "";
  const currentAddress = wallets[activeNetwork]?.address || "";

  return (
    <>
      {/* Кнопка активации модалки */}
      <Button 
        color="success" 
        variant="flat" 
        size="sm"
        className={`px-3 flex shrink-0 gap-1 font-mono tracking-wider items-center font-medium h-7 min-h-7 ${className}`}
        onPress={onOpen}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Wallet className="w-3.5 h-3.5 shrink-0" />
        {formatHash(primaryAddress)}
      </Button>

      {/* Модальное окно */}
      <div onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="sm" placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                {/* Шапка: Переключатель сетей */}
                <ModalHeader className="flex flex-col gap-1 items-center pb-2 pt-6">
                  <span className="text-sm font-semibold mb-2">Select Network</span>
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
                </ModalHeader>

                {/* Тело: QR и хэш-строка */}
                <ModalBody className="flex flex-col items-center pb-8 pt-4">
                  {/* QR Code */}
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-default-100 flex items-center justify-center" style={{ width: 200, height: 200 }}>
                    {currentAddress ? (
                      <QRCode value={currentAddress} size={168} />
                    ) : (
                      <span className="text-default-400 text-sm">No address</span>
                    )}
                  </div>

                  {/* Скопировать адрес (HeroUI Snippet делает все автоматически: серая подложка и иконка копирования) */}
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
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
