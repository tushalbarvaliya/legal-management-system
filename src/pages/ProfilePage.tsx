import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Portal from "@/components/Protal";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const toggleProfile = () => {
    if (profileOpen) {
      navigate("/login");
      return;
    }
    setProfileOpen((prev) => !prev);
  };
  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };
  return (
    <Portal>
      <Dialog open={profileOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center">Profile</DialogTitle>
            {/* Profile Image */}
            <Avatar>
              <AvatarFallback className="bg-stone-900 text-white font-bold">
                T
              </AvatarFallback>
            </Avatar>
            {/* Profile name */}
            <form>
              <FieldGroup>
                <Field>
                  <div className="grid grid-cols-4 my-2">
                    <FieldLabel htmlFor="">First Name</FieldLabel>
                    <FieldLabel htmlFor="">Tushal</FieldLabel>
                    <Input
                      id=""
                      name=""
                      type=""
                      placeholder="Enter your email"
                      readOnly={true}
                      defaultValue={"Tushal"}
                      className="col-span-3 hidden"
                    />
                    <FieldError>{}</FieldError>
                  </div>
                  <div className="grid grid-cols-4 my-2">
                    <FieldLabel htmlFor="">Last Name</FieldLabel>
                    <FieldLabel htmlFor="" className="">
                      Barvaliya
                    </FieldLabel>
                    <Input
                      id=""
                      name=""
                      type=""
                      placeholder="Enter your email"
                      readOnly={true}
                      defaultValue={"Barvaliya"}
                      className="col-span-3 hidden"
                    />
                    <FieldError>{}</FieldError>
                  </div>
                  {/* Email */}
                  <div className="grid grid-cols-4 my-2">
                    <FieldLabel htmlFor="" className="col-span-1">
                      Email
                    </FieldLabel>
                    <FieldLabel htmlFor="" className="col-span-1">
                      tushal@gmail.com
                    </FieldLabel>
                    <Input
                      id=""
                      name=""
                      type=""
                      placeholder="Enter your email"
                      readOnly={true}
                      defaultValue={"tushal@gmail.com"}
                      className="col-span-3 hidden"
                    />
                    <FieldError>{}</FieldError>
                  </div>
                  <div className="grid grid-cols-4 my-2">
                    <FieldLabel htmlFor="">Role</FieldLabel>
                    <FieldLabel htmlFor="">LAWYER</FieldLabel>
                    <Input
                      id=""
                      name=""
                      type=""
                      placeholder="Enter your email"
                      readOnly={true}
                      defaultValue={"LAWYER"}
                      className="col-span-3 hidden"
                    />
                    <FieldError>{}</FieldError>
                  </div>
                </Field>
                <Field orientation="horizontal">
                  {false! && (
                    <Button type="reset" variant="outline">
                      Reset
                    </Button>
                  )}
                  {!isEdit && (
                    <>
                      <Button type="button" onClick={toggleProfile}>
                        {"close"}
                      </Button>
                      <Button type="button" onClick={toggleEdit}>
                        {"Edit"}
                      </Button>
                    </>
                  )}

                  {isEdit && (
                    <Button type="submit" onClick={toggleEdit}>
                      {"submit"}
                    </Button>
                  )}
                </Field>
              </FieldGroup>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Portal>
  );
};

export default ProfilePage;
