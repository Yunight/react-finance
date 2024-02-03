import { useAppSelector } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { dateConvert } from "@/lib/utils";
import { ThComponent } from "./ThComponent";
import {
  FcCalendar,
  FcCurrencyExchange,
  FcApproval,
  FcBusiness,
  FcContacts,
  FcDepartment,
  FcInfo,
  FcKey,
} from "react-icons/fc";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { MdCurrencyExchange } from "react-icons/md";
import { AiTwotoneTool } from "react-icons/ai";
import { TbExchange } from "react-icons/tb";

const TickerDetails = () => {
  const selectedTickerData = useAppSelector(
    (state) => state.ticker.selectedTicker
  );
  const isLoading = useAppSelector((state) => state.ticker.loading);

  if (!selectedTickerData || isLoading) {
    return null;
  }

  const icons = [
    <FcDepartment />,
    <FcContacts />,
    <FcBusiness />,
    <FcCurrencyExchange />,
    <FaArrowRightArrowLeft />,
    <FcInfo />,
    <FcApproval />,
    <MdCurrencyExchange />,
    <FcKey />,
    <AiTwotoneTool />,
    <TbExchange />,
    <FcCalendar />,
  ];

  return (
    <div className="w-1/2 mt-5">
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold leading-none tracking-tight">
            {selectedTickerData.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(selectedTickerData).map((key, index) => (
                <tr key={index}>
                  <ThComponent icon={icons[index % icons.length]}>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/_/g, " ")}
                  </ThComponent>
                  <td>
                    {key === "last_updated_utc"
                      ? dateConvert(
                          selectedTickerData[
                            key as keyof typeof selectedTickerData
                          ] as string
                        )
                      : key === "active"
                      ? "Yes"
                      : selectedTickerData[
                          key as keyof typeof selectedTickerData
                        ]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TickerDetails;
