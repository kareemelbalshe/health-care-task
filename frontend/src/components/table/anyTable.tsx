import { useNavigate } from "react-router-dom";
import Button from "../button/Button.tsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiEyeDuotone } from "react-icons/pi";
import { LuPencilLine } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { useMemo } from "react";

interface TableProps {
  thead: string[];
  headerData?: string[];
  tbodys?: Array<any>;
  titleHeader?: string;
  add?: boolean;
  linkAdd?: string;
  view?: boolean;
  linkView?: string;
  tog?: boolean;
  edit?: boolean;
  linkEdit?: string;
  del?: boolean;
  handleDelete?: (id: string) => void;
}

export default function AnyTable({
  thead,
  titleHeader,
  add = false,
  linkAdd,
  headerData,
  tbodys,
  view = false,
  linkView,
  edit = false,
  linkEdit,
  del = false,
  handleDelete,
}: TableProps) {
  const navigate = useNavigate();

  const renderActions = useMemo(() => {
    return (row: any) => (
      <td className="p-2 w-[250px] flex items-center gap-2 justify-around">
        {view && (
          <Button
            className="btn-sm px-2 py-2"
            text={"View"}
            icon={<PiEyeDuotone />}
            onClick={() => linkView && navigate(linkView + "/" + row?._id)}
          />
        )}
        {edit && (
          <Button
            text={"Edit"}
            className=""
            icon={<LuPencilLine />}
            onClick={() => linkEdit && navigate(linkEdit + "/" + row?._id)}
          />
        )}
        {del && (
          <Button
            text={"Delete"}
            className=""
            icon={<FaRegTrashAlt />}
            onClick={() => handleDelete && handleDelete(row?._id)}
          />
        )}
      </td>
    );
  }, [view, edit, del, linkView, linkEdit, handleDelete, navigate]);
  

  return (
    <>
      <div className={`overflow-x-scroll hide-scrollbar w-fit`}>
        {(titleHeader || add) && (
          <div className="flex justify-between items-center">
            <div className="pt-3 pl-4 mb-3">
              <h1 className="font-bold text-[25px]">{titleHeader}</h1>
            </div>
            {add && (
              <Button
                text={`Add ${titleHeader}`}
                // width="w-40"
                icon={<IoMdAdd />}
                onClick={() => linkAdd && navigate(linkAdd)}
              />
            )}
          </div>
        )}
        <div className="border border-amber-400 mb-5 w-full"></div>
        <div className={`relative`}>
          <table className="w-full border-collapse border-2 border-amber-400">
            <thead>
              <tr className="border-2 border-amber-400">
                {thead?.map((header, index) => (
                  <th key={index} className={`p-3`}>
                    <span className="">{`${header}`}</span>
                  </th>
                ))}
                <th className={`w-[250px] text-center p-3`}>{"Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {tbodys?.map((row, rowIndex) => (
                <tr key={rowIndex} className={`border-2 border-amber-400`}>
                  {headerData?.map((header, index) => (
                    <td
                      key={index}
                      className="min-w-[120px] !text-center mx-2 justify-items-center "
                    >
                      {header === "image" || header === "avatar" ? (
                        <img
                          src={row?.[header][0].url || row?.[header].url}
                          alt="profile"
                          className="w-10 h-10 mx-auto rounded-full bg-cover bg-center"
                          loading="lazy"
                        />
                      ) : header === "section" ? (
                        <span className="block max-w-xs px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                          {row?.[header]?.title || "No Title"}
                        </span>
                      ) : (
                        <span className="block max-w-xs px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                          {row?.[header] || "N/A"}
                        </span>
                      )}
                    </td>
                  ))}
                  {renderActions(row)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
