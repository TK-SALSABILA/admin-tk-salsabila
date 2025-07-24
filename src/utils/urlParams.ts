import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Helper class for managing URL search parameters in Next.js App Router
 */
export class URLParamsHelper {
  private searchParams: ReadonlyURLSearchParams;
  private router: AppRouterInstance;

  constructor(
    searchParams: ReadonlyURLSearchParams,
    router: AppRouterInstance
  ) {
    this.searchParams = searchParams;
    this.router = router;
  }

  /**
   * Get current page number from URL params
   * @param defaultPage - Default page number if not found in URL
   * @returns Current page number
   */
  getCurrentPage(defaultPage: number = 1): number {
    return parseInt(this.searchParams.get("page") || defaultPage.toString());
  }

  /**
   * Get current items per page from URL params
   * @param defaultRpp - Default items per page if not found in URL
   * @returns Current items per page
   */
  getItemsPerPage(defaultRpp: number = 10): number {
    return parseInt(this.searchParams.get("rpp") || defaultRpp.toString());
  }

  /**
   * Get any parameter value from URL
   * @param key - Parameter key
   * @param defaultValue - Default value if not found
   * @returns Parameter value
   */
  getParam(key: string, defaultValue: string = ""): string {
    return this.searchParams.get(key) || defaultValue;
  }

  /**
   * Get all current search parameters as an object
   * @returns Object with all current parameters
   */
  getAllParams(): Record<string, string> {
    const params: Record<string, string> = {};
    this.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  /**
   * Update URL with new parameters
   * @param newParams - Object with parameters to update
   * @param options - Update options
   */
  updateParams(
    newParams: Record<string, string | number>,
    options: {
      resetPage?: boolean;
      preserveOthers?: boolean;
      replace?: boolean;
    } = {}
  ): void {
    const {
      resetPage = false,
      preserveOthers = true,
      replace = false,
    } = options;

    let params: URLSearchParams;

    if (preserveOthers) {
      // Preserve existing parameters
      params = new URLSearchParams(this.searchParams.toString());
    } else {
      // Start fresh
      params = new URLSearchParams();
    }

    // Reset page to 1 if requested
    if (resetPage) {
      params.set("page", "1");
    }

    // Update with new parameters
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    // Navigate to new URL
    const newUrl = `?${params.toString()}`;

    if (replace) {
      this.router.replace(newUrl);
    } else {
      this.router.push(newUrl);
    }
  }

  /**
   * Update page number
   * @param page - New page number
   * @param replace - Use replace instead of push
   */
  updatePage(page: number, replace: boolean = false): void {
    this.updateParams({ page }, { replace });
  }

  /**
   * Update items per page and reset to page 1
   * @param rpp - New items per page
   * @param replace - Use replace instead of push
   */
  updateItemsPerPage(rpp: number, replace: boolean = false): void {
    this.updateParams({ rpp }, { resetPage: true, replace });
  }

  /**
   * Update pagination parameters
   * @param page - New page number
   * @param rpp - New items per page
   * @param replace - Use replace instead of push
   */
  updatePagination(page: number, rpp?: number, replace: boolean = false): void {
    const params: Record<string, number> = { page };
    if (rpp !== undefined) {
      params.rpp = rpp;
    }
    this.updateParams(params, { replace });
  }

  /**
   * Remove specific parameters from URL
   * @param keys - Array of parameter keys to remove
   * @param replace - Use replace instead of push
   */
  removeParams(keys: string[], replace: boolean = false): void {
    const params = new URLSearchParams(this.searchParams.toString());

    keys.forEach((key) => {
      params.delete(key);
    });

    const newUrl = `?${params.toString()}`;

    if (replace) {
      this.router.replace(newUrl);
    } else {
      this.router.push(newUrl);
    }
  }

  /**
   * Clear all parameters
   * @param replace - Use replace instead of push
   */
  clearAllParams(replace: boolean = false): void {
    if (replace) {
      this.router.replace(window.location.pathname);
    } else {
      this.router.push(window.location.pathname);
    }
  }

  /**
   * Get pagination parameters for API calls
   * @param defaultPage - Default page number
   * @param defaultRpp - Default items per page
   * @returns Object with page and rpp for API
   */
  getPaginationParams(defaultPage: number = 1, defaultRpp: number = 10) {
    return {
      page: this.getCurrentPage(defaultPage),
      rpp: this.getItemsPerPage(defaultRpp),
    };
  }
}

/**
 * Hook-like function to create URLParamsHelper instance
 * @param searchParams - ReadonlyURLSearchParams from useSearchParams()
 * @param router - AppRouterInstance from useRouter()
 * @returns URLParamsHelper instance
 */
export const createURLParamsHelper = (
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
): URLParamsHelper => {
  return new URLParamsHelper(searchParams, router);
};

/**
 * Utility functions for URL params (without router dependency)
 */
export const URLParamsUtils = {
  /**
   * Parse page number from URLSearchParams
   */
  parsePage: (
    searchParams: ReadonlyURLSearchParams,
    defaultPage: number = 1
  ): number => {
    return parseInt(searchParams.get("page") || defaultPage.toString());
  },

  /**
   * Parse items per page from URLSearchParams
   */
  parseRpp: (
    searchParams: ReadonlyURLSearchParams,
    defaultRpp: number = 10
  ): number => {
    return parseInt(searchParams.get("rpp") || defaultRpp.toString());
  },

  /**
   * Get pagination parameters for API calls
   */
  getPaginationParams: (
    searchParams: ReadonlyURLSearchParams,
    defaultPage: number = 1,
    defaultRpp: number = 10
  ) => ({
    page: URLParamsUtils.parsePage(searchParams, defaultPage),
    rpp: URLParamsUtils.parseRpp(searchParams, defaultRpp),
  }),
};
