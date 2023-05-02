import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Swal from "sweetalert2";
import Link from "next/link";

export default function AddUser() {
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const addUser = async () => {
    await axios
      .post<User>(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, {
        first_name: firstName,
        last_name: lastName,
        email,
      })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          title: "User has been created successfully",
          confirmButtonText: "Confirm",
        }).then(() => {
          router.push(`/user/${data.id}`);
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Create User Failed.",
          confirmButtonText: "Confirm",
        });
      });
  };

  return (
    <div className="container">
      <Head>
        <title>Create User</title>
      </Head>

      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col col-sm-4 p-4">
          <div className="mb-5">
            <Link href="/">Back to Users</Link>
          </div>

          <h3 className="text-center">Create User</h3>
          <br />
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="text-center mt-5 d-flex justify-content-around">
              <button
                type="button"
                className="btn btn-primary px-5"
                onClick={addUser}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
