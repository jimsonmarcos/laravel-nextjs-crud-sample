import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Swal from "sweetalert2";
import Link from "next/link";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<User>();
  const [isUserNotFound, setUserNotFound] = useState<boolean>();

  useEffect(() => {
    if (id) {
      axios
        .get<User>(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`)
        .then(({ data }) => {
          setUser(data);
          console.log(data);
        })
        .catch(() => {
          setUserNotFound(true);
        });
    }
  }, [id]);

  const updateUser = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, { ...user })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "User has been updated successfully",
          confirmButtonText: "Confirm",
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Update User Failed.",
          confirmButtonText: "Confirm",
        });
      });
  };

  const deleteUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "User has been deleted successfully",
              confirmButtonText: "Confirm",
            }).then(() => {
              router.push("/");
            });
          })
          .catch((e) => {
            Swal.fire({
              icon: "error",
              title: "Delete User Failed.",
              confirmButtonText: "Confirm",
            });
          });
      }
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Edit User</title>
      </Head>

      {user && (
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col col-sm-4 p-4">
            <div className="mb-5">
              <Link href="/">Back to Users</Link>
            </div>

            <h3 className="text-center">Update User</h3>
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
                  value={user?.first_name}
                  onChange={(e) => {
                    setUser({ ...user, first_name: e.target.value });
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
                  value={user?.last_name}
                  onChange={(e) => {
                    setUser({ ...user, last_name: e.target.value });
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
                  value={user?.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>

              <div className="text-center mt-5 d-flex justify-content-around">
                <button
                  type="button"
                  className="btn btn-primary px-5"
                  onClick={updateUser}
                >
                  Submit
                </button>

                <button
                  type="button"
                  className="btn btn-danger px-5"
                  onClick={deleteUser}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isUserNotFound && "User Not Found."}
    </div>
  );
}
