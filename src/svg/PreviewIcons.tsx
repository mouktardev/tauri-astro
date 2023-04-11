import { ButtonsContainer, FadeRight } from "@anim/ani";
import Title from "@components/Title";
import { motion } from "framer-motion";
import * as Icons from "./Icons";

type Props = {};

export default function PreviewIcons({}: Props) {
	return (
		<div>
			<Title title="Icons" />
			<motion.div
				className="w-60 flex gap-3 items-center justify-center flex-wrap"
				variants={ButtonsContainer}
				initial={"hidden"}
				animate={"visible"}
			>
				<motion.div variants={FadeRight}>
					<Icons.AirPlay className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Ban className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Exclamation className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Gear className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Dots className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Discord className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Day className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Copy className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Copied className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Chevron className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Calender className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Battery className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.List className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Location className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Night className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Map className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Lyrics className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Pagination className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Pause className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.People className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Play className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					{" "}
					<Icons.Search className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Server className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Signal className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Skip className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Spinner className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Steam className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Store className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Tiktok className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Twitter className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.VolumeHigh className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.VolumeMute className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Wifi className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.Youtube className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
				<motion.div variants={FadeRight}>
					<Icons.instagram className="w-7 h-7 sm:w-5 sm:h-5 text-neutral-900 dark:text-white" />
				</motion.div>
			</motion.div>
		</div>
	);
}
