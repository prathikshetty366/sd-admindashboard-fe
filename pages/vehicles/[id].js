import React, { useState } from "react";
import { useRouter } from "next/router";

import Upload from "@/components/Upload/Upload";
import VehicleDataDisplay from "@/components/VehicleInfodisplay/VehicleInfodisplay";

const VehicleDetails = () => {
  const router = useRouter();
  const { vehiclereg } = router.query; // Extract 'id' from the URL

  return (
    <>
      <div className="flex justify-between flex-row mb-5">
        <div className="flex space-x-3">
          <div>
            <h2 className="font-bold text-[24px]">Vehicle Reg : ka20ec1108</h2>
          </div>
        </div>
      </div>

      <VehicleDataDisplay />

      <div>
        <hr />
        <h2 className="p-5 font-bold">Update Insurance & Emission Images</h2>
        <Upload
          uploadCount={5}
          uploadType="service"
          includeType="all"
          // includeType="png,jpg"
          excludeType="pdf"
          onChange={(uploads) => console.log(uploads)}
          errorMessage="Custom error message"
        />
      </div>
    </>
  );
};

export default VehicleDetails;
