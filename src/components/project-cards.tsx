import type { ProjectsType } from "../../utils/full-projects";
import { FormatDatetime } from "./date-formater";
import { Image } from "./image";
import { AnchorExternalLink } from "./ui/anchor-link";


export function ProjectCards({projects}: { projects?: ProjectsType | null }) {
	return (
		<div className="w-full my-20 p-6 flex flex-col justify-center items-center">
						{projects?.map(
							({
								id,
								name,
								image,
								dates,
								codeUrl,
								liveUrl,
								short,
								technologies,
								employer,
							}) => (
								<div
									key={id}
									className="w-full my-16 grid grid-cols-1 gap-2 md:grid-cols-4 md:text-right"
								>
									<p className="text-brand-aqua text-2xl md:col-start-2 md:col-end-6">
										{name}
									</p>
									<p className="text-2xl md:col-start-2 md:col-end-6">
										{dates?.startDate ? (<FormatDatetime
											dateObject={{
												datetimeString: dates?.startDate,
												formatter: 'MM/dd/yy',
												timezone: 'none',
											}}
										/>):undefined}
										{dates?.startDate && dates?.endDate ? <span> - </span>:undefined}
										{dates?.endDate ? (
										<FormatDatetime
											dateObject={{
												datetimeString: dates?.endDate,
												formatter: 'MM/dd/yy',
												timezone: 'none',
											}}
										/>):undefined}
									</p>
									<p className="bg-black rounded-xl py-6 px-4 flex flex-col gap-4 md:col-span-6 md:order-last md:text-left">
										<span>{short}</span>
										<span className="inline-flex gap-2">
											{!codeUrl?.isPrivate && codeUrl?.link ? (
												<AnchorExternalLink href={codeUrl?.link}>
													Code Repo
												</AnchorExternalLink>
											) : undefined}
											{!codeUrl?.isPrivate &&
											codeUrl?.link &&
											!liveUrl?.isPrivate &&
											liveUrl?.link ? (
												<span>|</span>
											) : undefined}
											{!liveUrl?.isPrivate && liveUrl?.link ? (
												<AnchorExternalLink href={liveUrl?.link}>
													Deployed Code
												</AnchorExternalLink>
											) : undefined}
										</span>
									</p>

									{technologies ? (
										<p className="md:col-start-2 md:col-end-6">
											<span className="font-serif font-black text-[1.05rem]">The technologies includes:</span>
											<span className="w-full font-light inline-flex gap-2 flex-wrap md:justify-end">
												{technologies?.map(({ id, title }) => (
													<span key={id}>{title}</span>
												))}
											</span>
										</p>
									) : undefined}

									{employer ? (
										<div className="w-full flex justify-between items-center md:flex-row-reverse md:justify-start md:gap-4 md:col-start-2 md:col-end-6">
											<p className="flex flex-col gap-2">
												<span>Made For:</span>
												<span>{employer?.name}</span>
											</p>

											<Image
												loading="lazy"
												id={employer?.image?.id}
												alt={employer?.image?.alt}
												preview={employer?.image?.lqip}
												width={70}
												height={70}
												className="rounded-full"
											/>
										</div>
									) : undefined}

									<div className="w-full aspect-video p-4 rounded-xl border-t-2 border-l-2 border-brand-aqua md:col-start-0 md:col-end-1 md:row-span-4 md:order-first">
										<Image
											loading="lazy"
											id={image?.id}
											alt={image?.alt}
											preview={image?.lqip}
											mode="cover"
											className="rounded-lg aspect-video w-full object-cover"
											sizes="(max-width: 400px) 600px, calc((100vw - 40px - 30px) / 3)"
										/>
									</div>
								</div>
							),
						)}
					</div>
	);
}
