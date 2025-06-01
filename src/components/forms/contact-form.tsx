
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
// Removida a importação da Server Action: import { submitContactForm } from "@/app/actions/contact-actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }).max(500, {
    message: "A mensagem não pode exceder 500 caracteres.",
  }),
});

export type ContactFormData = z.infer<typeof formSchema>;

// Substitua pela URL do seu script PHP ou serviço de formulário
const FORM_ENDPOINT_URL = "/api/enviar-contato.php"; // Exemplo: você precisará criar este script no seu servidor

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch(FORM_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Tente pegar uma mensagem de sucesso do backend, se houver
        let responseData = { message: "Obrigado por entrar em contato. Responderemos em breve." };
        try {
            responseData = await response.json();
        } catch (e) {
            // Se o backend não retornar JSON ou estiver vazio, usa a mensagem padrão
        }

        toast({
          title: "Mensagem Enviada!",
          description: responseData.message,
          variant: "default",
        });
        form.reset();
      } else {
        // Tente pegar uma mensagem de erro do backend, se houver
        let errorData = { error: "Houve um problema ao enviar sua mensagem. Tente novamente." };
         try {
            errorData = await response.json();
        } catch (e) {
            // Se o backend não retornar JSON ou estiver vazio, usa a mensagem padrão
        }
        toast({
          title: "Erro ao Enviar",
          description: `${errorData.error} (Status: ${response.status})`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro inesperado ao conectar ao servidor. Por favor, tente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center">Formulário de Contato</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva sua necessidade ou dúvida..."
                      className="min-h-[120px]"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
