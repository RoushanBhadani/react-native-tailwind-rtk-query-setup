import { Button } from "react-native-paper";

const CustomButton = ({
  title,
  onPress,
  disabled,
  className,
  ...props
}: any) => {
  const backgroundColor = disabled ? "gray" : "#f58e07";
  const textColor = disabled ? "#e0e0e0" : "white";

  return (
    <Button
      onPress={onPress}
      disabled={disabled}
      className={className}
      {...props}
      buttonColor={backgroundColor}
      textColor={textColor}
      rippleColor={disabled ? "gray" : "#faf7f2"}
      style={{
        paddingVertical: 6,
        borderRadius: 5,
        opacity: disabled ? 0.8 : 1,
      }}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
