import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import { updateUser } from "@/store/slices/userSlice";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  // Protect route
  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  }, [user.token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = useCallback(() => {
    const newErrors = {
      firstName: "",
      lastName: "",
    };

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    return !newErrors.firstName && !newErrors.lastName;
  }, [form.firstName, form.lastName]);

  useEffect(() => {
    if (!isEdit) return;

    const timer = setTimeout(() => {
      validate();
    }, 300);

    return () => clearTimeout(timer);
  }, [isEdit, validate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      updateUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: user.email,
      }),
    );
    setIsEdit(false);
  };

  return (
    <div className="mt-10 flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-stone-900 text-white text-lg font-bold">
              {user.firstName?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label className="font-medium">First Name</label>

            {!isEdit ? (
              <p>{user.firstName}</p>
            ) : (
              <>
                <Input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="font-medium">Last Name</label>

            {!isEdit ? (
              <p>{user.lastName}</p>
            ) : (
              <>
                <Input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="font-medium">Email</label>
            <p>{user.email}</p>
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="font-medium">Role</label>
            <p>{user.role}</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {!isEdit ? (
              <>
                <Button
                  type="button"
                  onClick={() => {
                    setForm({
                      firstName: user.firstName,
                      lastName: user.lastName,
                    });
                    setErrors({
                      firstName: "",
                      lastName: "",
                    });
                    setIsEdit(true);
                  }}
                >
                  Edit
                </Button>
              </>
            ) : (
              <Button type="submit">Save</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
