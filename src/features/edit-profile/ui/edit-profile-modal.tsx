"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Modal, ModalContent, ModalHeader, ModalBody, Tabs, Tab, Spinner } from "@/shared/ui/primitives";
import { GeneralInfoTab, ContactsTab, SkillsTab, ExperienceTab, WalletsTab, CoopsTab } from "./tabs";
import { getMyFullProfileAction } from "../api";
import type { ProfileFullData } from "@/entities/profiles/types";

interface EditProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileModal({ isOpen, onOpenChange }: EditProfileModalProps) {
  const t = useTranslations("EditProfile");
  const [profile, setProfile] = useState<ProfileFullData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    const result = await getMyFullProfileAction();
    if (result.data) {
      setProfile(result.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      Promise.resolve().then(() => loadProfile());
    }
  }, [isOpen, loadProfile]);

  const handleSaved = () => {
    loadProfile();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t("title")}
            </ModalHeader>
            <ModalBody className="pb-6 px-1 sm:px-6">
              {isLoading && !profile ? (
                <div className="flex justify-center p-8"><Spinner /></div>
              ) : !profile ? (
                <div className="text-center text-default-500 py-8">Failed to load profile</div>
              ) : (
                <Tabs aria-label="Edit Profile Tabs" className="w-full" variant="underlined">
                  <Tab key="general" title={t("tabGeneral")}>
                    <GeneralInfoTab 
                      initialData={{
                        fullName: profile.fullName || "",
                        username: profile.username || "",
                        headline: profile.headline || "",
                        shortDescription: profile.shortDescription || "",
                        location: profile.location || "",
                        timezone: profile.timezone || "",
                        availabilityStatus: profile.availabilityStatus || "",
                        languages: profile.languages || []
                      }}
                      onSaved={handleSaved}
                    />
                  </Tab>
                  <Tab key="contacts" title={t("tabContacts")}>
                    <ContactsTab 
                      initialData={profile.contacts || {}}
                      onSaved={handleSaved}
                    />
                  </Tab>
                  <Tab key="skills" title={t("tabSkills")}>
                    <SkillsTab 
                      initialSkills={(profile.skills || []).map(s => ({ ...s, category: s.category || "Other", level: 3, iconUrl: s.iconUrl || null }))}
                      onSaved={handleSaved}
                    />
                  </Tab>
                  <Tab key="experience" title={t("tabExperience")}>
                    <ExperienceTab 
                      initialExperiences={(profile.experiences || []).map(e => ({ 
                        ...e, 
                        description: e.description || "",
                        skills: (e.skills || []).map(s => ({ ...s, category: s.category || "Other", level: 3, iconUrl: s.iconUrl || null }))
                      }))}
                      onSaved={handleSaved}
                    />
                  </Tab>
                  <Tab key="wallets" title={t("tabWallets")}>
                    <WalletsTab 
                      initialData={profile.wallets || {}}
                      onSaved={handleSaved}
                    />
                  </Tab>
                  <Tab key="coops" title={t("tabCoops") || "Cooperatives"}>
                    <CoopsTab proposerAddress={profile.blockchainAccount} />
                  </Tab>
                </Tabs>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
