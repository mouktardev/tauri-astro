import * as Icons from "@svg/Icons";
import { appWindow } from "@tauri-apps/api/window";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

type Props = {};

export default function Nav({}: Props) {
	return (
		<div
			data-tauri-drag-region
			className="sticky select-none flex items-center inset-x-0 p-2"
		>
			<div className="mr-auto">
				<ThemeToggle />
			</div>
			<Button id="titlebar-close" onClick={() => appWindow.minimize()}>
				<Icons.Minimize className="w-8 h-8 text-neutral-900 dark:text-white" />
			</Button>
			<Button id="titlebar-maximize" onClick={() => appWindow.toggleMaximize()}>
				<Icons.Maximize className="w-8 h-8 text-neutral-900 dark:text-white" />
			</Button>
			<Button id="titlebar-minimize" onClick={() => appWindow.close()}>
				<Icons.Close className="w-8 h-8 text-neutral-900 dark:text-white" />
			</Button>
		</div>
	);
}
