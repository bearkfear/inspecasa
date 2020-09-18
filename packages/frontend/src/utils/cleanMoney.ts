export default function (val: string): number {
	return Number(
		(val || "R$ 0,00")
			.replace(/\./g, "")
			.replace("R$ ", "")
			.replace(",", ".")
	)
}

