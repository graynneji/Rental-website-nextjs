//you cannot have a onClick or interactivity in a server component
//we can create a server actions they allow us to have interactivity to server component or a form when we cllick that button the form will be submitted - server action like the on in form
//theres multiple places to define a server actio but best way is to creat a file actions.js

import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    //server actions
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
