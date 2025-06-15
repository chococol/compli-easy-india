
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Simplified fields for MVP
const defaultAsset = {
  type: "",
  name: "",
  ownership: "",
  location: "",
  acquiredDate: "",
  value: ""
};

interface AddAssetDialogProps {
  onAdd: (asset: typeof defaultAsset) => void;
}

const AddAssetDialog: React.FC<AddAssetDialogProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [asset, setAsset] = useState(defaultAsset);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAsset((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAdd = () => {
    onAdd(asset);
    setAsset(defaultAsset);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-fit">
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
          <DialogDescription>
            Enter the asset details below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <div className="space-y-4">
            <Input name="type" placeholder="Type (e.g. Property, Trademark, Patent)" value={asset.type} onChange={handleChange} required />
            <Input name="name" placeholder="Asset Name" value={asset.name} onChange={handleChange} required />
            <Input name="ownership" placeholder="Ownership (e.g. 100%)" value={asset.ownership} onChange={handleChange} />
            <Input name="location" placeholder="Location" value={asset.location} onChange={handleChange} />
            <Input name="acquiredDate" placeholder="Acquired Date" value={asset.acquiredDate} onChange={handleChange} />
            <Input name="value" placeholder="Value" value={asset.value} onChange={handleChange} />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Add Asset</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssetDialog;
