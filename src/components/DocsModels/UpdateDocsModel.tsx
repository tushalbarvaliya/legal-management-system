import { getAddCase } from "@/api/caseAPI";
import { updateDocs } from "@/api/docsAPI";
import type { caseDataType } from "@/Data/caseData";
import { queryClient } from "@/main";
import type { DocumentData } from "@/types/docsType";
import { convertToBase64 } from "@/utils/converteToBase64";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type UpdateModelProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
} & DocumentData;

const UpdateDocsModel = ({ closeModal, ...data }: UpdateModelProps) => {
  const [replcaeFile, setReplaceFile] = useState<boolean>(false);

  const { data: caseData } = useQuery<caseDataType[]>({
    queryKey: ["cases"],
    queryFn: getAddCase,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: updateDocs,
    onSuccess: () => {
      toast.success("Docs Edit successfully");
      queryClient.invalidateQueries({ queryKey: ["docs"] });
      closeModal(false);
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DocumentData>({
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      title: data.title,
      caseId: data.caseId,
      description: data.description,
      documentLink: data.documentLink,
      fileType: data.fileType,
      note: data.note,
    },
  });

  const onSubmit = (formData: DocumentData) => {
    mutate({
      ...formData,
      id: data.id,
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-70 ">
        <div className="absolute inset-0 bg-zinc-900/45"></div>

        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white shadow-soft">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                Edit Document
              </h3>
              <button
                className="rounded-lg border border-zinc-200 p-2 hover:bg-zinc-100"
                onClick={() => closeModal(false)}
              >
                <img src="/x.svg" className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form
              className="max-h-[85vh] space-y-4 overflow-y-auto px-5 py-4 sm:px-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Title + Case ID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Title <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm"
                    {...register("title", { required: true })}
                  />
                  <p className="text-xs text-red-500">
                    {errors.title?.message}
                  </p>
                </label>

                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Case ID <span className="text-red-500">*</span>
                  </span>

                  <select
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("caseId", {
                      minLength: {
                        value: 1,
                        message: "caseID length should be greater than 3",
                      },
                      required: true,
                    })}
                  >
                    <option value="">Select ...</option>
                    {caseData?.map((item) => {
                      return <option value={item.id}>{item.title}</option>;
                    })}
                  </select>
                  <p className=" text-xs text-red-500">
                    {errors.caseId?.message}
                  </p>
                </label>
              </div>

              {/* Description */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Description <span className="text-red-500">*</span>
                </span>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm"
                  {...register("description", { required: true })}
                />
                <p className="text-xs text-red-500">
                  {errors.description?.message}
                </p>
              </label>

              {/* File Upload */}
              {!replcaeFile ? (
                <div className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm" onClick={()=>{setReplaceFile(true)}}>
                    File Uploaded Please Click to replace it
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5 text-sm text-zinc-700">
                    <span className="font-medium">Replace File</span>
                    <input
                      type="file"
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const base64 = await convertToBase64(file);

                        setValue("documentLink", base64);
                        setValue("fileType", file.type);
                      }}
                    />
                  </label>

                  <label className="space-y-1.5 text-sm text-zinc-700">
                    <span className="font-medium">File Type</span>
                    <input
                      type="text"
                      disabled
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm"
                      {...register("fileType")}
                    />
                  </label>
                </div>
              )}

              {/* Notes */}
              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">Notes</span>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm"
                  {...register("note")}
                />
              </label>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                {!isPending ? (
                  <>
                    <button
                      type="button"
                      className="rounded-lg border px-4 py-2.5 text-sm"
                      onClick={() => closeModal(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm text-white"
                    >
                      Update Document
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm text-white"
                  >
                    Updating...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDocsModel;
