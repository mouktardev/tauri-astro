import * as Icons from "@svg/Icons";
import {
	SortingState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { dialog } from "@tauri-apps/api";
import { readBinaryFile } from "@tauri-apps/api/fs";
import { basename } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useState } from "react";
import { getMimeTypeFromArray, getSizeTrans } from "src/utility/util";
import Button from "./Button";

type FileData = {
	name: string;
	typeName: string;
	before: string;
	after: string;
	rate: string;
	path: string;
};

const columnHelper = createColumnHelper<FileData>();
const columns = [
	columnHelper.accessor("name", {
		header: () => <span>File Name</span>,
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("typeName", {
		cell: (info) => info.getValue(),
		header: () => <span>Type</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("rate", {
		cell: (info) => info.getValue(),
		header: () => <span>Rate</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("before", {
		cell: (info) => info.getValue(),
		header: () => <span>Size before</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("after", {
		cell: (info) => info.getValue(),
		header: () => <span>Size after</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("path", {
		cell: (info) => info.getValue(),
		header: () => <span>Path</span>,
		footer: (info) => info.column.id,
	}),
];

export default function FileListButton() {
	const [data, setData] = useState<FileData[]>([]);
	const [loading, setLoading] = useState(false);
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
	});

	const chooseFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const selected = await dialog.open({
			multiple: true,
			filters: [
				{
					name: "Image",
					extensions: ["png", "jpg", "jpeg", "gif"],
				},
			],
		});
		if (Array.isArray(selected)) {
			for (const path of selected) {
				const fileName = await basename(path);
				const exists = data.some((item) => item.name === fileName);
				if (!exists) {
					const fileU8A = await readBinaryFile(path);
					const binaryFileTyp = getMimeTypeFromArray(fileU8A);
					const blob = new Blob([fileU8A], { type: binaryFileTyp });
					const size = getSizeTrans(blob.size);
					const type = blob.type;

					const fileData: FileData = {
						name: fileName,
						typeName: type,
						before: size,
						after: "",
						rate: "",
						path: convertFileSrc(path),
					};
					setData((prevData) => [...prevData, fileData]);
				}
			}
		}
	};

	// 	const chooseFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
	// 		const selected = await dialog.open({
	// 			multiple: true,
	// 			filters: [
	// 			{
	// 				name: "Image",
	// 				extensions: ["png", "jpg", "jpeg", "gif"],
	// 			},
	// 			],
	// 		});
	// 		if (Array.isArray(selected)) {
	// 			// user selected multiple files
	// 			const promises = selected.map(async (path) => {
	// 			const fileU8A = await readBinaryFile(path);
	// 			const baseName = await basename(path);
	// 			const binaryFileTyp = getMimeTypeFromArray(fileU8A);
	// 			const blob = new Blob([fileU8A], { type: binaryFileTyp });
	// 			const size = getSizeTrans(blob.size);
	// 			const type = blob.type;
	// 			return { path, baseName, size, type };
	// 			});

	// 			const fileContents = await Promise.allSettled(promises);
	// 			const successfulFiles = fileContents
	// 			.filter((result) => result.status === "fulfilled")
	// 			.map((result) => result.value);

	// 			const transformedDataPromises = successfulFiles.map(async (file) => {
	// 			const transformedFile = {
	// 				name: file.baseName,
	// 				typeName: file.type,
	// 				before: file.size,
	// 				after: "",
	// 				rate: "",
	// 				path: convertFileSrc(file.path),
	// 			};
	// 			return transformedFile;
	// 			});

	// 			const transformedData = await Promise.allSettled(transformedDataPromises);
	// 			const successfulTransformedData = transformedData
	// 			.filter((result) => result.status === "fulfilled")
	// 			.map((result) => result.value);

	// 			setData([...data, ...successfulTransformedData]);
	// 		}
	// };

	//  useEffect(() => {
	// console.log(data);
	// table.getRowModel().rows.map(row => row.getVisibleCells().map(cell => console.log(cell.column.columnDef.cell)))
	//  }, [])

	return (
		<section className="container mx-auto p-5 w-50 h-50">
			<Button
				className="flex items-center gap-4 border border-neutral-800 dark:border-white text-lg dark:text-white p-4"
				onClick={chooseFiles}
			>
				Add images
				<Icons.Document className="h-6 w-6 text-neutral-800 dark:text-white" />
			</Button>
			<table className="table-fixed border border-neutral-800 dark:border-white mt-6 divide-x">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									className="font-light border border-r-white text-neutral-800 dark:text-white p-4"
									key={header.id}
								>
									{header.isPlaceholder ? null : (
										<div
											{...{
												className: header.column.getCanSort()
													? "flex items-center gap-2 cursor-pointer select-none"
													: "",
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: <Icons.Chevron className="h-4 w-4 rotate-180 " />,
												desc: <Icons.Chevron className="h-4 w-4" />,
											}[header.column.getIsSorted() as string] ?? null}
										</div>
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							className="font-light text-neutral-800 dark:text-white p-4"
						>
							{row.getVisibleCells().map((cell) =>
								cell.getIsPlaceholder() ? (
									<td
										className="font-light text-neutral-800 dark:text-white p-4"
										key={cell.id}
									>
										<Icons.Spinner className="w-6 h-6" />
									</td>
								) : (
									<td
										className="font-light text-neutral-800 dark:text-white p-4"
										key={cell.id}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								)
							)}
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
