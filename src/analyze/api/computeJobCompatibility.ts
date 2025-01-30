import computeCompatibility from '../../../../job-hunter/ai/compute_compatibility';
import type { Context } from '../../core/context';

async function computeJobCompatibility(description: string, _context: Context) {
    return computeCompatibility(description);
}

export default computeJobCompatibility;
