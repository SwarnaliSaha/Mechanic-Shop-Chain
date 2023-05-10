// {$sort : value}
// {$limit:value}
// {$}
interface IFilterObject {
    [filter: string]: number | string
}
export const generatePipeline = (query: any) => {
    let pipeline = [];

    const { sort, limit = 10, sortDir, page = 1, ...filter } = query;

    for (let field in filter) {
        if (Array.isArray(field[filter])) {
            const stage = {
                $match: {
                    field: {
                        $in: filter[field]
                    }
                }
            }
            pipeline.push(stage);
        }
        else if (typeof filter[field] === 'object') {
            const stage: IFilterObject = {};
            for (let [key, value] of Object.entries(filter[field])) {
                stage[`$${key}`] = Number(value);
            }
            pipeline.push({
                $match: {
                    [field]: stage
                }
            })
        }
        else {
            pipeline.push({
                $match: {
                    [field]: filter[field]
                }
            })
        }
    }
    const sortObject: IFilterObject = {}
    if (sort) {
        sortObject[sort] = sortDir == (1 || 'asc') ? 1 : -1;
        pipeline.push({ $sort: sortObject });
    }
    if (limit && page) {
        pipeline.push({
            $skip: (Number(page - 1)) * limit
        })
        pipeline.push({
            $limit: Number(limit)
        })
    }
    console.log(pipeline)
    return pipeline;
}