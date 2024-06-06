import { AuthTabs } from "@/components/auth-tabs";

function AuthPage() {
  return (
    <>
      <div className="flex w-dvh h-dvh items-center justify-center p-8">
          <AuthTabs />
      </div>
    </>
  );
}

export default AuthPage;
