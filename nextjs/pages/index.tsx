import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ReactSlider from "./components/ReactSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then(({ data }: { data: User[] }) => {
        setUsers(data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch users.",
          confirmButtonText: "Confirm",
        });
      });
  }, []);

  return (
    <div className="container">
      <Head>
        <title>NextJS CRUD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="row">
        <div className="col p-4">
          <ReactSlider>
            {users.map((user) => (
              <div key={user.id}>
                <h2 className="text-center py-5">
                  <Link href={`user/${user.id}`} className="p-4">
                    {user.first_name} {user.last_name}
                  </Link>
                </h2>
              </div>
            ))}
          </ReactSlider>

          <div className="text-center py-5">
            <Link href="/user/add">
              <h3>Create User</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
