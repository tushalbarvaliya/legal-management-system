import { getAddCase } from "@/api/caseAPI";
import { createDocs } from "@/api/docsAPI";
import type { caseDataType } from "@/Data/caseData";
import { queryClient } from "@/main";
import type { DocumentData } from "@/types/docsType";
import { convertToBase64 } from "@/utils/converteToBase64";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type AddModalProps = {
  onClose: (b: boolean) => void;
};

const AddDocsModal = ({ onClose }: AddModalProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: createDocs,
    onSuccess: () => {
      toast.success("Docs Add successfully");
      queryClient.invalidateQueries({ queryKey: ["docs"] });
      onClose(false);
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
  });

  const { data } = useQuery<caseDataType[]>({
    queryKey: ["cases"],
    queryFn: getAddCase,
  });

  const onSubmit = (data: DocumentData) => {
    console.log(data);

    // mutate(data);
  };

  return (
    <>
      <div className="fixed inset-0 z-70 ">
        <div className="absolute inset-0 bg-zinc-900/45"></div>
        <div className="relative mx-auto flex min-h-full w-full items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 sm:px-6">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                Create Document
              </h3>
              <button
                className="rounded-lg border border-zinc-200 p-2 text-zinc-700 transition duration-200 hover:bg-zinc-100"
                type="button"
                onClick={() => {
                  onClose(false);
                }}
              >
                <img src="/x.svg" alt="x" className="h-4 w-4" />
              </button>
            </div>
            <form
              className="max-h-[85vh] space-y-4 overflow-y-auto px-5 py-4 sm:px-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Title <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("title", {
                      minLength: {
                        value: 3,
                        message: "Title length should be greater than 3 ",
                      },
                      required: true,
                    })}
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
                    {data?.map((item) => {
                      return <option value={item.id}>{item.title}</option>;
                    })}
                  </select>
                  <p className=" text-xs text-red-500">
                    {errors.caseId?.message}
                  </p>
                </label>
              </div>

              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">
                  Description <span className="text-red-500">*</span>
                </span>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("description", {
                    minLength: {
                      value: 3,
                      message: "description length should be greater than 3",
                    },
                    required: true,
                  })}
                ></textarea>
                <p className=" text-xs text-red-500">
                  {errors.description?.message}
                </p>
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    File Link <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="file"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm"
                    required
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      const mimeType = file?.type || "";
                      if (!file) return;
                      const base64 = await convertToBase64(file);
                      setValue("fileType", mimeType);
                      setValue("documentLink", base64);
                    }}
                  />
                  <p className=" text-xs text-red-500">
                    {errors.documentLink?.message}
                  </p>
                </label>
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    fileType <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    disabled
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("fileType", {
                      required: {
                        value: true,
                        message: "File Type Is Required",
                      },
                    })}
                  />
                  <p className=" text-xs text-red-500">
                    {errors.fileType?.message}
                  </p>
                </label>
              </div>

              <label className="space-y-1.5 text-sm text-zinc-700">
                <span className="font-medium">Notes</span>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                  {...register("note")}
                ></textarea>
              </label>
              <div className="flex flex-col-reverse gap-2 border-t border-zinc-200 pt-4 sm:flex-row sm:justify-end">
                {!isPending && (
                  <>
                    <button
                      type="button"
                      className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition duration-200 hover:bg-zinc-100"
                      onClick={() => {
                        onClose(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                    >
                      Create Document
                    </button>
                  </>
                )}
                {isPending && (
                  <>
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:bg-zinc-800"
                      disabled={isPending}
                    >
                      Create...
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDocsModal;
