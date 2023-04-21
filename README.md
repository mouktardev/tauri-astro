# Tauri-Astro-React

![Banner](/public/asset/Banner.png)

my Astro Tauri boilerplate template

example:

```typescript
import { dialog } from "@tauri-apps/api";
import { homeDir } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";

export default function FileListButton() {
	const [Images, setImages] = useState<string[]>([]);

	const chooseFiles = async () => {
		const home = await homeDir();
		const selected = await dialog.open({
			multiple: true,
			// defaultPath: `${home}/images/original`,
			filters: [
				{
					name: "Image",
					extensions: ["png", "jpg", "jpeg"],
				},
			],
		});
		if (Array.isArray(selected)) {
			// user selected multiple files
			setImages([...selected].map((path) => convertFileSrc(path)));
		} else if (selected === null) {
			// user cancelled the selection
			setImages([]);
		} else {
			// user selected a single directory
			setImages([...selected].map((path) => convertFileSrc(path)));
		}
	};
}
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                                           |
| :-------------------- | :--------------------------------------------------------------- |
| `npm install`         | Installs dependencies                                            |
| `npm run tauri dev`   | Starts local dev server at `localhost:3000` and lunch app window |
| `npm run tauri build` | Build your production app to `./dist/`                           |
| `npm run format`      | prettier format files                                            |
| `npm run check`       | prettier check formated files                                    |
