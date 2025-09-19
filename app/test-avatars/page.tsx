"use client";

import { mockPoliticians } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function TestAvatarsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Teste de Avatares dos Políticos</h1>
      <p className="text-muted-foreground mb-8">
        Verificando se as fotos correspondem ao gênero correto dos nomes
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mockPoliticians.map((politician) => {
          const isFemale = ['Maria', 'Ana', 'Patricia', 'Juliana', 'Beatriz', 'Luciana', 'Claudia', 'Daniela', 'Cristiane', 'Vanessa', 'Fernanda', 'Aline', 'Mariana', 'Tatiana', 'Isabella'].some(fn => politician.name.includes(fn));

          return (
            <Card key={politician.id} className="p-4">
              <CardContent className="p-0">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={politician.avatarUrl} alt={politician.name} />
                    <AvatarFallback>
                      {politician.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="font-semibold text-sm">{politician.name}</p>
                    <Badge variant={isFemale ? "secondary" : "default"} className="mt-1">
                      {isFemale ? "Feminino" : "Masculino"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{politician.position}</p>
                    <p className="text-xs text-muted-foreground">{politician.party}</p>
                    <p className="text-xs text-primary mt-2 break-all">{politician.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}