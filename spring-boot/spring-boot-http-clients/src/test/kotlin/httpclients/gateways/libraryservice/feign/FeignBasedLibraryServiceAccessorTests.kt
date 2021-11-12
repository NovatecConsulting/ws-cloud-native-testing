package httpclients.gateways.libraryservice.feign

import com.github.tomakehurst.wiremock.junit5.WireMockRuntimeInfo
import com.github.tomakehurst.wiremock.junit5.WireMockTest
import httpclients.gateways.libraryservice.LibraryServiceContract
import httpclients.gateways.libraryservice.LibraryServiceProperties
import okhttp3.OkHttpClient

/**
 * Since this is a block-box integration test, it can be implemented using a
 * contract interface [LibraryServiceContract].
 */
@WireMockTest
internal class FeignBasedLibraryServiceAccessorTests(
    wireMockInfo: WireMockRuntimeInfo
) : LibraryServiceContract {
    override val wireMock = wireMockInfo.wireMock
    override val cut = FeignBasedLibraryServiceAccessor(
        httpClient = OkHttpClient(),
        properties = LibraryServiceProperties(baseUrl = wireMockInfo.httpBaseUrl)
    )
}
