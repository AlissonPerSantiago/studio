
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
  // Campo honeypot opcional para Formspree, se desejar
  // _gotcha: z.string().optional(),
});

export type ContactFormData = z.infer<typeof formSchema>;

// INSTRUÇÃO IMPORTANTE: Substitua pela URL do seu endpoint Formspree!
const FORM_ENDPOINT_URL = "https://formspree.io/f/YOUR_FORM_ID"; // Substitua YOUR_FORM_ID pelo ID do seu formulário Formspree

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      // _gotcha: "", // Inicialize se estiver usando o campo honeypot
    },
  });

  async function onSubmit(values: ContactFormData) {
    setIsSubmitting(true);

    if (FORM_ENDPOINT_URL === "https://formspree.io/f/YOUR_FORM_ID") {
      toast({
        title: "Configuração Necessária",
        description: "Por favor, substitua 'YOUR_FORM_ID' no código pelo seu ID de formulário Formspree.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(FORM_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Importante para Formspree com AJAX
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast({
          title: "Mensagem Enviada!",
          description: responseData.message || "Obrigado por entrar em contato. Responderemos em breve.",
          variant: "default",
        });
        form.reset();
      } else {
        const errorData = await response.json();
        toast({
          title: "Erro ao Enviar",
          description: errorData.error || `Houve um problema ao enviar sua mensagem. (Status: ${response.status})`,
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
            {/* Campo honeypot opcional para Formspree - adicione se ativado no Formspree */}
            {/* <FormField
              control={form.control}
              name="_gotcha"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} autoComplete="off" tabIndex={-1} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
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
                    <Input type="email" placeholder="seu@email.com" {...field} name="email" disabled={isSubmitting} />
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
                      name="message"
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
