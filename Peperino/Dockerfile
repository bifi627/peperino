#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0.302 AS build
WORKDIR /src
COPY ["Peperino/Peperino.csproj", "Peperino/"]
COPY ["Peperino.Infrastructure/Peperino.Infrastructure.csproj", "Peperino.Infrastructure/"]
COPY ["Peperino.Contracts/Peperino.Contracts.csproj", "Peperino.Contracts/"]
COPY ["Peperino.Domain/Peperino.Domain.csproj", "Peperino.Domain/"]
COPY ["Peperino.EntityFramework/Peperino.EntityFramework.csproj", "Peperino.EntityFramework/"]
COPY ["Peperino.Application/Peperino.Application.csproj", "Peperino.Application/"]

COPY ["Peperino.Core/Peperino.Core.Auth/Peperino.Core.Auth.csproj", "Peperino.Core/Peperino.Core.Auth/"]
COPY ["Peperino.Core/Peperino.Core.Contracts/Peperino.Core.Contracts.csproj", "Peperino.Core/Peperino.Core.Contracts/"]
COPY ["Peperino.Core/Peperino.Core.EntityFramework/Peperino.Core.EntityFramework.csproj", "Peperino.Core/Peperino.Core.EntityFramework/"]
COPY ["Peperino.Core/Peperino.Core.Tests/Peperino.Core.Tests.csproj", "Peperino.Core/Peperino.Core.Tests/"]
COPY ["Peperino.Core/Peperino.Core.Web/Peperino.Core.Web.csproj", "Peperino.Web/Peperino.Core.Web/"]

RUN dotnet restore "Peperino/Peperino.csproj"
COPY . .
WORKDIR "/src/Peperino"
RUN dotnet build "Peperino.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Peperino.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Peperino.dll"]