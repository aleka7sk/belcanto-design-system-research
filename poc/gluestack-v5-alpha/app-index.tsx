import { Badge, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function BelcantoFoundationPoC() {
  return (
    <Box className="flex-1 bg-background">
      <ScrollView contentContainerClassName="gap-5 px-5 pb-28 pt-16">
        <VStack className="gap-1">
          <Text className="text-sm text-muted-foreground">Добрый вечер</Text>
          <Text className="text-3xl font-semibold text-foreground">
            Твой голос растёт
          </Text>
        </VStack>

        <Card className="gap-5 rounded-[22px] border border-border bg-card p-5">
          <HStack className="items-start justify-between gap-4">
            <VStack className="flex-1 gap-2">
              <Badge className="self-start rounded-full bg-primary/15 px-3 py-1">
                <BadgeText className="text-primary">Следующий шаг</BadgeText>
              </Badge>
              <Text className="text-xl font-semibold text-foreground">
                Урок с Аидой
              </Text>
              <Text className="text-sm text-muted-foreground">
                Сегодня, 19:00 · Зал «Камертон»
              </Text>
            </VStack>
          </HStack>
          <Button className="min-h-12 rounded-2xl bg-primary">
            <ButtonText className="text-base font-semibold">
              Подготовиться к уроку
            </ButtonText>
          </Button>
        </Card>

        <Card className="gap-5 rounded-[22px] border border-border bg-card p-5">
          <HStack className="items-center justify-between">
            <VStack className="gap-1">
              <Text className="text-sm text-muted-foreground">
                Уверенность на сцене
              </Text>
              <Text className="text-4xl font-semibold text-foreground">
                7.4
                <Text className="text-lg text-muted-foreground"> / 10</Text>
              </Text>
            </VStack>
            <Badge className="rounded-full bg-success/10 px-3 py-1">
              <BadgeText className="text-success">+0.8</BadgeText>
            </Badge>
          </HStack>
          <Progress value={74} className="h-2.5 bg-secondary">
            <ProgressFilledTrack className="bg-primary" />
          </Progress>
        </Card>
      </ScrollView>
    </Box>
  );
}
