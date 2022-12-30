import { Icon, IconName, IconProps } from "../Icon";
import { IconButtonContainer, IconButtonContainerProps } from "./styles";

interface IconButtonProps extends IconButtonContainerProps {
  icon: IconName;
  iconProps?: Omit<IconProps, "name">;
}

export function IconButton({
  icon,
  iconProps,
  children,
  ...props
}: IconButtonProps) {
  return (
    <IconButtonContainer
      {...props}
    >
      <Icon {...iconProps} name={icon}/>
      {children}
    </IconButtonContainer>
  );
}