import { docsAdd } from "@/api/docsAPI";
import type { DocsState } from "@/types/formType";
import { urlRegex } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type AddModalProps = {
  onClose: (b: boolean) => void;
};

const AddDocsModal = ({ onClose }: AddModalProps) => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  const { mutate, isPending } = useMutation({
    // mutationFn: async () => {},
    mutationFn: docsAdd,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      setFormError(`Something is not right Error : ${error}`);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DocsState>({
    mode: "onChange",
    delayError: 500,
  });

  const onSubmit = (data: DocsState) => {
    mutate(data);
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
                        value: 10,
                        message: "Title length should be greater than 10 ",
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
                  <input
                    type="number"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("caseID", {
                      minLength: {
                        value: 3,
                        message: "caseID length should be greater than 3",
                      },
                      required: true,
                    })}
                  />
                  <p className=" text-xs text-red-500">
                    {errors.caseID?.message}
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
                      value: 10,
                      message: "description length should be greater than 10",
                    },
                    required: true,
                  })}
                ></textarea>
                <p className=" text-xs text-red-500">
                  {errors.description?.message}
                </p>
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    File Link <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="url"
                    placeholder="https://"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("fileLink", {
                      required: true,
                      pattern: {
                        value: urlRegex,
                        message: "Please Enter a valid URL",
                      },
                    })}
                  />
                  <p className=" text-xs text-red-500">
                    {errors.fileLink?.message}
                  </p>
                </label> */}
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    File Link <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="file"
                    placeholder="https://"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("fileLink", {
                      required: true,
                    })}
                  />
                  <p className=" text-xs text-red-500">
                    {errors.fileLink?.message}
                  </p>
                </label>
                <label className="space-y-1.5 text-sm text-zinc-700">
                  <span className="font-medium">
                    Client ID <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 outline-none transition duration-200 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                    {...register("clientID", {
                      minLength: {
                        value: 3,
                        message: "caseID length should be greater than 3",
                      },
                      required: true,
                    })}
                  />
                  <p className=" text-xs text-red-500">
                    {errors.clientID?.message}
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
              <p className=" text-xs text-red-500">{formError}</p>
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
