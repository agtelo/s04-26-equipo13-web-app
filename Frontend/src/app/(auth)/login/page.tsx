import { Logo } from "@/components/shared/Logo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LoginForm } from "./components";

export default function LoginPage() {
  return (
    <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden w-full max-w-md">
      <CardHeader className="text-center pt-16 pb-10">
        <Logo className="text-primary w-14 h-14 mx-auto mb-6" />
        <CardTitle className="text-4xl font-serif italic mb-2">
          Distiller
        </CardTitle>
        <CardDescription className="uppercase text-[10px] font-bold tracking-[0.2em] text-muted-foreground/60 flex flex-col gap-1 items-center">
          <span>AI Content Pipeline</span>
          <span className="opacity-75">by TalentCircle</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 pb-16 sm:px-14">
        <LoginForm />
      </CardContent>
    </Card>
  );
}
