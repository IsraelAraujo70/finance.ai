import Image from "next/image"
import { Button } from "../_components/ui/button"
import { LogInIcon } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const  LoginPage = async () => {
    const {userId} = await auth()
    if (userId){
        redirect('/')
    }
    return (  
        <div className="grid grid-cols-2 h-full">
            <div className="flex h-full flex-col justify-center p-8 max-w-[550px]">
                <div className="flex items-center mb-8">
                    <Image src="/logo.svg" alt="" width={39} height={39}/>
                    <h1 className="text-2xl font-bold ms-3">AgiFinance</h1>
                </div>
                <h2 className="text-4xl font-bold mb-3 leading-[39px]">Bem-vindo</h2>
                <p className="text-muted-foreground mb-8">
                A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.
                </p>
                <SignInButton>
                <Button variant="outline"> <LogInIcon className="mr-2"></LogInIcon> Fazer login ou Criar conta</Button>
                </SignInButton>
            </div>
            <div className="relative h-full w-full">
                <Image src="/login.png" 
                alt="Faça Login" 
                fill 
                className="object-cover"/>
            </div>
        </div>
    )
}
export default LoginPage