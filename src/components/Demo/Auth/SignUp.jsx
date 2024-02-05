import{ useState } from "react";
import Input from "../../../utils/Input";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignUp = ({ setSignReq, setModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form[("username", "email", "password", "rePassword")] === "") {
      toast.error("All fields are required");
    } else if (form["password"] !== form["rePassword"]) {
      toast.error("Your passwords are not matching!!");
      return;
    } else {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const ref = doc(db, "users", user.uid);
      const userDoc = await getDoc(ref);

      if (!userDoc.exists()) {
        await setDoc(ref, {
          userId: user.uid,
          username: form.username,
          email: form.email,
          userImg: "",
          bio: "",
          created: Date.now(),
        });
        navigate("/");
        toast.success("New Account has been Created");
        setModal(false);
        setLoading(false);
      }
    }
  };

  return (
    <div className="size mt-[6rem] text-center">
      <h2 className="text-3xl">Sign up with email</h2>
      <p className="w-full sm:w-[25rem] mx-auto py-[3rem]">
        Enter the email address associated with your account, and we’ll send a
        magic link to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input form={form} setForm={setForm} type="text" title="username" />
        <Input form={form} setForm={setForm} type="email" title="email" />
        <Input form={form} setForm={setForm} type="password" title="password" />
        <Input
          form={form}
          setForm={setForm}
          type="password"
          title="rePassword"
        />
        <button
          className={`px-4 py-1 text-sm rounded-full bg-teal-500
        hover:bg-teal-500 text-white w-fit mx-auto
        ${loading ? "opacity-50 pointer-events-none" : ""}`}>
          SignUp
        </button>
      </form>
      <button
        onClick={() => setSignReq("")}
        className="mt-5 text-sm text-teal-500 hover:text-teal-800
      flex items-center mx-auto">
        <MdKeyboardArrowLeft />
        All sign Up Options
      </button>
    </div>
  );
};

export default SignUp;
