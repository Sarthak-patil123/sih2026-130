'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Save, 
  CheckCircle2, 
  Briefcase 
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';

export default function ProfilePage() {
  const { currentUser, currentProject } = usePortal();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "Rajesh S. Deshmukh",
    email: currentUser?.email || "rajesh.deshmukh@abcfood.in",
    contact: currentUser?.contact || "+91 98230 45678",
    designation: currentUser?.designation || "Managing Director",
    companyName: currentUser?.companyName || "ABC Food Processing Pvt. Ltd.",
    registrationNumber: currentUser?.registrationNumber || "U15400MH2024PTC392811",
    pan: currentUser?.pan || "AABCA8923F",
    gst: currentUser?.gst || "27AABCA8923F1Z8",
    udyam: currentUser?.udyam || "UDYAM-MH-20-0098412",
    address: currentUser?.address || "Plot B-14, Butibori Industrial Area, Nagpur, Maharashtra - 441122"
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl font-bold text-[#0F2942]">Enterprise & User Profile</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified corporate entity information and single-window authorized signatory profile.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit Information
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={Save}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-xs text-emerald-900 shadow-2xs">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">Enterprise profile updated in local state successfully.</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Authorized Signatory */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="h-5 w-5 text-[#0F2942]" />
            <h3 className="text-sm font-bold text-[#0F2942]">Authorized Signatory Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
            <Input
              label="Designation"
              name="designation"
              value={profileData.designation}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
            <Input
              label="Official Email ID"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
            <Input
              label="Mobile Contact"
              name="contact"
              value={profileData.contact}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        {/* Section 2: Corporate Legal Information */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="h-5 w-5 text-[#0F2942]" />
            <h3 className="text-sm font-bold text-[#0F2942]">Corporate Legal & Tax Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company Legal Name"
              name="companyName"
              value={profileData.companyName}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
            <Input
              label="MCA Corporate Identification Number (CIN)"
              name="registrationNumber"
              value={profileData.registrationNumber}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
            <Input
              label="Enterprise PAN"
              name="pan"
              value={profileData.pan}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
            <Input
              label="GSTIN (Maharashtra)"
              name="gst"
              value={profileData.gst}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
            <div className="sm:col-span-2">
              <Input
                label="MSME Udyam Registration Number"
                name="udyam"
                value={profileData.udyam}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Registered Factory / Office Address in Maharashtra"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Active Unit Overview */}
        {currentProject && (
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <h3 className="text-sm font-bold text-[#0F2942]">Active Registered Unit Overview</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-md border border-slate-200">
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Project ID</span>
                <span className="font-mono font-bold text-blue-700 text-sm mt-0.5 block">{currentProject.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Investment Outlay</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{currentProject.investment}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Industrial District</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{currentProject.district}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Workforce</span>
                <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{currentProject.employees}</span>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
