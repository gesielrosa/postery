import { inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

export function setQueryParams() {
  const router = inject(Router);
  const activatedRoute = inject(ActivatedRoute);

  const set = (queryParams: Params | null) => {
    Object.keys(queryParams || {}).forEach(key => {
      if (queryParams) {
        queryParams[key] = queryParams[key];
      }
    });

    router.navigate([], {
      relativeTo: activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  };

  return {
    set,
  };
}
