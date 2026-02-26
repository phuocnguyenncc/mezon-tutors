'use client';

import { YStack, H1, Paragraph, ScrollView, Container } from '@mezon-tutors/app/ui';

export function HomeScreen() {
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      position="relative"
    >
      <ScrollView flex={1}>
        <Container
          paddingTop="$4"
          gap="$4"
        >
          <YStack gap="$3">
            <H1 size="$8">Messages</H1>
            <Paragraph color="$color10">Your messages will appear here.</Paragraph>
          </YStack>
        </Container>
      </ScrollView>
    </YStack>
  );
}
