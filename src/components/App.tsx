import imageTiny from "@mxsir/image-tiny";
import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile } from "@tauri-apps/api/fs";
import { downloadDir } from "@tauri-apps/api/path";
import { getCurrent } from "@tauri-apps/api/window";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import Button from "./Button";

type Datas = {
	imgList: Record<string, any>[];
	tip: string;
	winTop: string;
	quality: number;
};

export default function App() {
	const [datas, setDatas] = useState<Datas>({
		imgList: [],
		tip: "Drag and drop picture file to the upper area",
		winTop: "Window top",
		quality: 80,
	});

	const dragenterEvent = (event: {
		preventDefault: () => void;
		stopPropagation: () => void;
	}) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const dragoverEvent = (event: {
		preventDefault: () => void;
		stopPropagation: () => void;
	}) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const dragleaveEvent = (event: {
		preventDefault: () => void;
		stopPropagation: () => void;
	}) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const dropEvent = (event: {
		preventDefault: () => void;
		stopPropagation: () => void;
		dataTransfer: any;
	}) => {
		event.preventDefault();
		event.stopPropagation();
		const files = event.dataTransfer.files;
		displayChsFile(files);
	};

	const getSelected = (event: { target: { value: any } }) => {
		setDatas({ ...datas, quality: event.target.value });
	};

	const handleWindowTop = () => {
		if (datas.winTop === "Window top") {
			getCurrent().setAlwaysOnTop(true);
			setDatas({ ...datas, winTop: "Cancel the top" });
		} else {
			getCurrent().setAlwaysOnTop(false);
			setDatas({ ...datas, winTop: "Window top" });
		}
	};

	const handleClearList = () => {
		setDatas({
			...datas,
			imgList: [],
			tip: "Drag and drop picture file to the upper area",
			quality: 80,
		});
	};

	const handleSaveFile = async (file: Record<string, any>) => {
		setDatas({ ...datas, tip: "Image preservation..." });
		const basePath = await downloadDir();
		let selPath = await save({
			defaultPath: basePath,
		});
		if (selPath) {
			selPath = selPath.replace(/Untitled$/, "");
		}
		const reader = new FileReader();
		reader.readAsArrayBuffer(file.data);
		reader.onload = function (e) {
			if (e.target) {
				let fileU8A = new Uint8Array(e.target.result as ArrayBufferLike);
				writeBinaryFile({
					contents: fileU8A,
					path: `${selPath}${file.data.name}`,
				});
				setDatas({ ...datas, tip: "The picture is successful" });
			}
		};
	};

	const handleDownloadAll = async () => {
		const len = datas.imgList.length;
		if (len === 0) {
			return;
		}
		setDatas({ ...datas, tip: "zip saving..." });
		const zip = new JSZip();
		for (let i = 0; i < len; i++) {
			zip.file(datas.imgList[i].name, datas.imgList[i].data);
		}
		const date = new Date();
		const mon =
			(date.getMonth() + 1 < 10
				? "0" + (date.getMonth() + 1)
				: date.getMonth() + 1) + "_";
		const day = date.getDate() + "_";
		const hour = date.getHours() + "_";
		const min = date.getMinutes();

		const basePath = await downloadDir();
		let selPath = await save({
			defaultPath: basePath,
		});
		if (selPath) {
			selPath = selPath.replace(/Untitled$/, "");
		}
		zip.generateAsync({ type: "blob" }).then((content) => {
			let file = new FileReader();
			file.readAsArrayBuffer(content);
			file.onload = function (e) {
				if (e.target) {
					let fileU8A = new Uint8Array(e.target.result as ArrayBufferLike);
					writeBinaryFile({
						contents: fileU8A,
						path: `${selPath}IMG_${mon + day + hour + min}.zip`,
					});
					setDatas({ ...datas, tip: "zip Saved successfully" });
				}
			};
		});
	};

	function getSizeTrans(fs: number): string {
		if (fs < 1024) {
			return String(fs);
		} else if (fs < 1024 * 1024) {
			return parseInt(String((fs * 10) / 1024)) / 10 + "K";
		} else if (fs < 1024 * 1024 * 1024) {
			return parseInt(String((fs * 10) / 1024 / 1024)) / 10 + "M";
		} else {
			return parseInt(String((fs * 10) / 1024 / 1024 / 1024)) / 10 + "G";
		}
	}

	async function displayChsFile(files: FileList) {
		let liNum = datas.imgList.length;
		const imgFiles: File[] = [];
		const showImgs: Record<string, any>[] = [];
		for (let i = 0; i < files.length; i++) {
			const file = files.item(i);
			if (file?.type.includes("image")) {
				imgFiles.push(file as File);
				const showFile = {
					name: file.name,
					before: getSizeTrans(file.size),
					data: null,
					status: "Compression...",
					after: null,
					rate: null,
					url: null,
				};
				showImgs.push(showFile);
			}
		}
		setDatas((prevState) => ({
			...prevState,
			imgList: [...prevState.imgList, ...showImgs],
		}));

		// setTimeout(() => {
		// 	imgFiles.forEach((file) => {
		// 		uploadFile(file, liNum);
		// 		liNum++;
		// 	});
		// }, 500);
	}

	async function uploadFile(file: File, ufid: number) {
		let tinyFile = await imageTiny(file, datas.quality);
		const rate = ((((file.size - tinyFile.size) * 100) / file.size) | 0) + "%";
		const imgInfo = {
			name: file.name,
			before: getSizeTrans(file.size),
			data: tinyFile,
			status: "Finish",
			after: getSizeTrans(tinyFile.size),
			rate: rate,
			url: null,
		};
		updateImgList(ufid, imgInfo);
	}

	function updateImgList(ufid: number, imgInfo: any) {
		setDatas((prevState) => {
			const updatedImgList = [...prevState.imgList];
			updatedImgList[ufid] = imgInfo;
			return { ...prevState, imgList: updatedImgList };
		});
	}

	useEffect(() => {
		console.log(datas);
	}, [datas]);

	return (
		<div
			className="main"
			onDragEnter={dragenterEvent}
			onDragOver={dragoverEvent}
			onDragLeave={dragleaveEvent}
			onDrop={dropEvent}
		>
			{/* head*/}
			<div className="header">
				<div className="cell-name">name</div>
				<div className="cell-common">state</div>
				<div className="cell-common">Original size</div>
				<div className="cell-common">After compression</div>
				<div className="cell-common">Compression ratio</div>
				<div className="cell-down">operate</div>
			</div>
			{/* Content area */}
			<div className="middle-con">
				{datas.imgList.length === 0 ? (
					<div className="drop-tip">Drag graphic</div>
				) : (
					<div className="image-items">
						<ul>
							{datas.imgList.map((item, index) => (
								<li className="image-list" key={index}>
									<div className="cell-name">{item.name || "--"}</div>
									<div
										className={
											"cell-common" +
											(item.status === "Finish" ? " sucess" : "")
										}
									>
										{item.status || "--"}
									</div>
									<div className="cell-common">{item.before || "--"}</div>
									<div className="cell-common">{item.after || "--"}</div>
									<div className="cell-common">{item.rate || "--"}</div>
									<div className="cell-down">
										<p onClick={() => handleSaveFile(item)}>
											{item.status === "Finish" ? "keep" : "--"}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			{/* bottom */}
			<div className="footer">
				<div className="action-left">
					{datas.tip && (
						<div className="action-btn-add-tip">🔔 {datas.tip}</div>
					)}
				</div>
				<div className="action-right">
					<div className="action-quality">
						<p>quality</p>
						<select
							className="action-quality-sel"
							value={datas.quality}
							onChange={getSelected}
							name="quality"
						>
							<option value="80">80</option>
							<option value="70">70</option>
							<option value="60">60</option>
							<option value="50">50</option>
							<option value="40">40</option>
							<option value="30">30</option>
							<option value="20">20</option>
							<option value="10">10</option>
						</select>
						<p>%</p>
					</div>
					<Button className="action-btn" onClick={handleWindowTop}>
						{datas.winTop}
					</Button>
					<Button className="action-btn" onClick={handleClearList}>
						Clear list
					</Button>
					<Button className="action-btn" onClick={handleDownloadAll}>
						One -click package
					</Button>
				</div>
			</div>
		</div>
	);
}
