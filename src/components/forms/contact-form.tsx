
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

// Endpoint real do Formspree fornecido pelo usuário
const FORM_ENDPOINT_URL = "https://formspree.io/f/xblyrbel";

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
  // Campo opcional para honeypot do Formspree, se você configurar um
  // _gotcha: z.string().optional(),
});

export type ContactFormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      // _gotcha: "", // Se usar honeypot
    },
  });

  async function onSubmit(values: ContactFormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch(FORM_ENDPOINT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", // Importante para Formspree tratar como AJAX
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // A resposta do Formspree com status 200 geralmente indica sucesso
        // Pode haver um corpo JSON com mais detalhes, mas para uma mensagem simples, isso basta.
        toast({
          title: "Mensagem Enviada!",
          description: "Sua mensagem foi enviada com sucesso. Responderemos em breve!",
          variant: "default",
        });
        form.reset();
      } else {
        // Se o Formspree retornar um erro (ex: 4xx, 5xx)
        const errorData = await response.json().catch(() => ({})); // Tenta pegar a resposta de erro JSON
        const errorMessage = errorData.error || "Falha ao enviar mensagem. Verifique os dados ou tente mais tarde.";
        toast({
          title: "Erro ao Enviar",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro no envio do formulário para Formspree:", error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro inesperado ao tentar enviar sua mensagem. Por favor, tente mais tarde.",
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
                    {/* O Formspree usa o campo 'name="email"' para o endereço de resposta */}
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
                      name="message" // O Formspree também usa 'name="message"'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Se você usar um campo honeypot no Formspree:
            <FormField
              control={form.control}
              name="_gotcha"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input type="text" {...field} autoComplete="off" />
                  </FormControl>
                </FormItem>
              )}
            />
            */}
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
