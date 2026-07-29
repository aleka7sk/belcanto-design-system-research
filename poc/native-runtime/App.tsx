import { useEffect, useMemo, useState } from "react";
import {
  AccessibilityInfo,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";

type Screen = "today" | "form" | "recovery";
type ThemeName = "dark" | "light";
type Palette = ReturnType<typeof palette>;

const fixtures = {
  lesson: "Вокал · сегодня, 19:00",
  teacher: "Преподаватель: Алия С.",
  preparation: "Подготовьте куплет и припев «Аққуым»",
};

function palette(theme: ThemeName) {
  const dark = theme === "dark";
  return {
    bg: dark ? "#17121F" : "#F7F4FB",
    surface: dark ? "#241C30" : "#FFFFFF",
    surfaceStrong: dark ? "#30243F" : "#EEE8F5",
    text: dark ? "#F7F4FB" : "#21172B",
    muted: dark ? "#C9BDD5" : "#665A70",
    border: dark ? "#4B3A5D" : "#D8CDE2",
    accent: dark ? "#C39AF8" : "#6F3CAF",
    onAccent: dark ? "#23152F" : "#FFFFFF",
    danger: dark ? "#FFB4AB" : "#9F221B",
    success: dark ? "#A8DAB5" : "#24693A",
  };
}

function ActionButton({
  label,
  p,
  onPress,
}: {
  label: string;
  p: Palette;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: p.accent, opacity: pressed ? 0.82 : 1 },
      ]}
    >
      <Text style={[styles.buttonText, { color: p.onAccent }]}>{label}</Text>
    </Pressable>
  );
}

function Section({ children, p }: { children: React.ReactNode; p: Palette }) {
  return (
    <View style={[styles.section, { backgroundColor: p.surface, borderColor: p.border }]}>
      {children}
    </View>
  );
}

function Today({ p, announce }: { p: Palette; announce: (value: string) => void }) {
  return (
    <>
      <Text accessibilityRole="header" style={[styles.eyebrow, { color: p.accent }]}>
        СЕГОДНЯ
      </Text>
      <Text accessibilityRole="header" style={[styles.title, { color: p.text }]}>
        Что поможет вам прийти на урок увереннее?
      </Text>
      <Section p={p}>
        <Text style={[styles.kicker, { color: p.muted }]}>{fixtures.lesson}</Text>
        <Text accessibilityRole="header" style={[styles.sectionTitle, { color: p.text }]}>
          {fixtures.preparation}
        </Text>
        <Text style={[styles.body, { color: p.muted }]}>{fixtures.teacher}</Text>
        <ActionButton
          p={p}
          label="Открыть подготовку"
          onPress={() => announce("Подготовка к уроку открыта")}
        />
      </Section>
      <Text accessibilityRole="header" style={[styles.subhead, { color: p.text }]}>
        Дальше
      </Text>
      <Text style={[styles.body, { color: p.muted }]}>
        После урока преподаватель добавит заметку и следующее действие.
      </Text>
    </>
  );
}

function Form({ p, announce }: { p: Palette; announce: (value: string) => void }) {
  const [value, setValue] = useState("Хочу увереннее держать длинную ноту");
  const [conflict, setConflict] = useState(false);

  return (
    <>
      <Text accessibilityRole="header" style={[styles.eyebrow, { color: p.accent }]}>
        ЗАМЕТКА К УРОКУ
      </Text>
      <Text accessibilityRole="header" style={[styles.title, { color: p.text }]}>
        Что хотите разобрать?
      </Text>
      <Text nativeID="lesson-note-label" style={[styles.label, { color: p.text }]}>
        Комментарий
      </Text>
      <TextInput
        accessibilityLabel="Комментарий к уроку"
        accessibilityLabelledBy="lesson-note-label"
        multiline
        value={value}
        onChangeText={setValue}
        style={[
          styles.input,
          {
            color: p.text,
            backgroundColor: p.surface,
            borderColor: conflict ? p.danger : p.border,
          },
        ]}
      />
      {conflict && (
        <Section p={p}>
          <Text
            accessibilityRole="alert"
            style={[styles.sectionTitle, { color: p.danger }]}
          >
            Есть более новая версия
          </Text>
          <Text style={[styles.body, { color: p.muted }]}>
            Ваш текст не потерян. Сравните версии перед заменой.
          </Text>
        </Section>
      )}
      <ActionButton
        p={p}
        label={conflict ? "Сравнить версии" : "Сохранить"}
        onPress={() => {
          if (conflict) {
            announce("Сравнение версий открыто");
            return;
          }
          setConflict(true);
          announce(
            "Сохранить не удалось. Ваш текст сохранён на устройстве. Есть более новая версия.",
          );
        }}
      />
    </>
  );
}

function Recovery({ p, announce }: { p: Palette; announce: (value: string) => void }) {
  return (
    <>
      <Text accessibilityRole="header" style={[styles.eyebrow, { color: p.danger }]}>
        НЕТ СОЕДИНЕНИЯ
      </Text>
      <Text accessibilityRole="header" style={[styles.title, { color: p.text }]}>
        Сегодняшний план доступен офлайн
      </Text>
      <Section p={p}>
        <Text accessibilityRole="header" style={[styles.sectionTitle, { color: p.success }]}>
          Данные сохранены
        </Text>
        <Text style={[styles.body, { color: p.muted }]}>
          Время урока, преподаватель и подготовка останутся доступны. Изменения отправятся
          после подключения.
        </Text>
      </Section>
      <ActionButton
        p={p}
        label="Повторить подключение"
        onPress={() => announce("Подключение всё ещё недоступно")}
      />
      <Text style={[styles.body, { color: p.muted }]}>
        Можно продолжить без сети — ничего вводить повторно не придётся.
      </Text>
    </>
  );
}

export default function App() {
  const system = useColorScheme();
  const { fontScale, width } = useWindowDimensions();
  const [theme, setTheme] = useState<ThemeName>(system === "light" ? "light" : "dark");
  const [screen, setScreen] = useState<Screen>("today");
  const [reduced, setReduced] = useState(false);
  const p = useMemo(() => palette(theme), [theme]);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced);
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduced);
    return () => subscription.remove();
  }, []);

  const announce = (value: string) => {
    AccessibilityInfo.announceForAccessibility(value);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: p.bg }]}>
      <ScrollView
        contentContainerStyle={styles.page}
        accessibilityLabel="Belcanto native runtime proof"
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, { color: p.text }]}>Светлая тема</Text>
            <Switch
              accessibilityLabel="Светлая тема"
              value={theme === "light"}
              onValueChange={(value) => setTheme(value ? "light" : "dark")}
            />
          </View>
          <Text style={[styles.deviceContext, { color: p.muted }]}>
            {Platform.OS.toUpperCase()} {String(Platform.Version)} · {Math.round(width)} pt ·
            шрифт ×{fontScale.toFixed(2)} · движение{" "}
            {reduced ? "уменьшено" : "стандартное"}
          </Text>
        </View>

        <View accessibilityRole="tablist" style={styles.tabs}>
          {(["today", "form", "recovery"] as const).map((item) => (
            <Pressable
              key={item}
              accessibilityRole="tab"
              accessibilityState={{ selected: screen === item }}
              onPress={() => setScreen(item)}
              style={[styles.tab, { borderColor: screen === item ? p.accent : p.border }]}
            >
              <Text style={[styles.tabText, { color: screen === item ? p.accent : p.muted }]}>
                {item === "today" ? "Сегодня" : item === "form" ? "Форма" : "Офлайн"}
              </Text>
            </Pressable>
          ))}
        </View>

        {screen === "today" && <Today p={p} announce={announce} />}
        {screen === "form" && <Form p={p} announce={announce} />}
        {screen === "recovery" && <Recovery p={p} announce={announce} />}

        <Text style={[styles.fixture, { color: p.muted }]}>
          EXPLORATORY FIXTURES · {reduced ? "SYSTEM REDUCED MOTION" : "STANDARD MOTION"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  page: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 48, gap: 16 },
  controls: { gap: 8 },
  controlRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  controlLabel: { fontFamily: "Onest", fontWeight: "500", fontSize: 16 },
  deviceContext: { fontFamily: "Onest", fontWeight: "400", fontSize: 13, lineHeight: 20 },
  tabs: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  tab: {
    minHeight: 48,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 999,
  },
  tabText: { fontFamily: "Onest", fontWeight: "600", fontSize: 14 },
  eyebrow: {
    fontFamily: "Onest",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 1.4,
    marginTop: 8,
  },
  title: { fontFamily: "Onest", fontWeight: "700", fontSize: 34, lineHeight: 40 },
  subhead: {
    fontFamily: "Onest",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 28,
    marginTop: 8,
  },
  section: { gap: 12, borderWidth: 1, borderRadius: 20, padding: 18 },
  kicker: { fontFamily: "Onest", fontWeight: "500", fontSize: 15, lineHeight: 22 },
  sectionTitle: {
    fontFamily: "Onest",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 28,
  },
  body: { fontFamily: "Onest", fontWeight: "400", fontSize: 17, lineHeight: 26 },
  label: { fontFamily: "Onest", fontWeight: "600", fontSize: 16 },
  input: {
    minHeight: 144,
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    fontFamily: "Onest",
    fontWeight: "400",
    fontSize: 17,
    lineHeight: 26,
    textAlignVertical: "top",
  },
  button: {
    minHeight: 52,
    borderRadius: 16,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontFamily: "Onest", fontWeight: "700", fontSize: 17 },
  fixture: {
    fontFamily: "Onest",
    fontWeight: "600",
    fontSize: 11,
    letterSpacing: 1.1,
    marginTop: 12,
  },
});
