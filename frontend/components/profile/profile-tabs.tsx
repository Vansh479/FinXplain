"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDetailsPanel } from "./user-details-panel";
import { ReportsPanel } from "./reports-panel";
import { AccountSettingsPanel } from "./account-settings-panel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function ProfileTabs() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Tabs defaultValue="vault" className="w-full">
      <TabsList className="grid grid-cols-3 mb-10 h-12 bg-slate-100 p-1 rounded-xl">
        <TabsTrigger value="vault" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Report Vault</TabsTrigger>
        <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Analyst Profile</TabsTrigger>
        <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="vault">
        <ReportsPanel />
      </TabsContent>

      <TabsContent value="profile">
        <UserDetailsPanel userData={{ 
           name: user.username, 
           professionalRole: user.fi_title, 
           research_focus: user.research_focus 
        }} />
      </TabsContent>

      <TabsContent value="security">
        <AccountSettingsPanel settingsData={{ email: user.email }} />
      </TabsContent>
    </Tabs>
  );
}