import productionRepositories from 'myapp-core/repositories/production';
import services from 'myapp-core';

export default function(config) {
    // here you can change repositories implementation
    let repositories = productionRepositories(config);

    return services(repositories, config);
}
