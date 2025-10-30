import { Modal, Portal } from "react-native-paper";

interface ModalContainerProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  theme: {
    dark: boolean;
    colors: {
      surface: string;
    };
  };
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  visible,
  onDismiss,
  children,
  theme,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        style={{
          backgroundColor: theme.dark
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(0, 0, 0, 0.5)",
          padding: 20,
          justifyContent: "center",
        }}
        contentContainerStyle={{
          backgroundColor: theme.colors.surface,
          marginHorizontal: 24,
          padding: 20,
          maxHeight: "70%",
          borderRadius: 12,
        }}
      >
        {children}
      </Modal>
    </Portal>
  );
};
