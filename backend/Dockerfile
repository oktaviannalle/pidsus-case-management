# ─── Stage 1: Build ───────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file dan restore dependencies dulu (layer cache)
COPY ["PidsusAPI.csproj", "."]
RUN dotnet restore "PidsusAPI.csproj"

# Copy semua source code
COPY . .

# Build dalam mode Release
RUN dotnet build "PidsusAPI.csproj" -c Release -o /app/build

# ─── Stage 2: Publish ─────────────────────────────────────────────
FROM build AS publish
RUN dotnet publish "PidsusAPI.csproj" -c Release -o /app/publish --no-restore

# ─── Stage 3: Runtime (image lebih kecil) ─────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy hasil publish dari stage 2
COPY --from=publish /app/publish .

# Port yang digunakan Render (otomatis di-set via $PORT)
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "PidsusAPI.dll"]
