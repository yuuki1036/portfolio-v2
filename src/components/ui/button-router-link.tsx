import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { buttonVariants } from "#/components/ui/button.js";
import type { ButtonSize, ButtonVariant } from "#/components/ui/button.js";

type ButtonRouterLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/**
 * TanStack Router の `<Link>` に Button 相当のスタイルを当てたもの。
 * 内部ページ遷移（`to="/works"` 等）で SPA navigation を保ちながら Button の見た目を使いたい場合に用いる。
 * 外部リンクや `mailto:` には素の `ButtonLink` を、フォーム送信などには `Button` を使うこと。
 */
export function ButtonRouterLink({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonRouterLinkProps) {
  return (
    <Link className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
