declare interface Pagination<DataType> {
	data: DataType[];
	pageIndex: number;
	pageSize: number;
	totalElements: number;
	first: boolean;
	last: boolean;
}

declare interface Pokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
}
